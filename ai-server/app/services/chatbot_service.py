from app.core.gpt_client import call_chatgpt
from app.services.chatbot_state import (
    get_user_context,
    update_user_context,
    add_chat_to_redis,
    get_chat_history,
)
from app.repositories.chatbot_repository import save_chat_message
from app.models.chatbot_message import RoleEnum, ChatbotMessage
from sqlalchemy.orm import Session
from app.utils.slide_loader import get_slide_message, is_last_slide
from app.utils.post_api import post_to_spring_board
from app.utils.recommend import get_top_country_details
from app.constants.shopee_countries import SHOPEE_COUNTRIES
import asyncio

MAX_HISTORY = 10

SYSTEM_PROMPT = """
너는 사용자의 수출을 도와주는 친절하고 똑똑한 AI 챗봇이야. 다음과 같은 단계로 사용자를 도와줘야 해:

1. 품목 입력 → 수출 유망 국가 추천 (20개, 별도 리스트 제공됨)
2. 국가 선택 → 사용 가능한 플랫폼 추천 (Amazon/Shopee, 별도 플랫폼 목록 제공됨)
3. 플랫폼 선택 → 플랫폼 가이드를 슬라이드 단위로 설명 (이미지/텍스트 포함)
4. 사용자 판매글(제목/내용) 입력 → 영어 번역 제공
5. 번역된 글을 국내/해외 게시판에 등록할지 물어보기
6. 마무리 안내 ("게시 완료! 수고 많으셨습니다 😊")

하지만 사용자가 딱 위 단계를 따르지 않더라도 자연스럽게 문맥을 이어가야 해. 예를 들어:
- "아마존"이라고만 말해도 플랫폼 선택으로 이해해야 하고
- "세금 얼마나 붙어?" 같은 말이 나와도 친절하게 대답 후 다시 흐름 이어가야 해
- 숫자나 단어("1", "Shopee", "전시관", "다음")로 대답해도 문맥 이해해서 대응해야 해

응답은 자연스럽고 친근한 말투로 해줘. 과하지 않게 이모지도 약간 써도 돼.
"""


class ChatbotService:
    def handle(self, db: Session, user_id: str, message: str) -> dict:
        # 🔹 메시지 저장
        save_chat_message(db, user_id, RoleEnum.user, message)
        add_chat_to_redis(user_id, "user", message)

        # 🔹 이력 로딩
        chat_history = get_chat_history(user_id)[:MAX_HISTORY]
        formatted_history = self.convert_to_gpt_format(chat_history)

        # 🔹 컨텍스트 업데이트
        context = get_user_context(user_id)
        self.update_context_from_message(user_id, message)
        context = get_user_context(user_id)  # 최신 상태로 다시 로딩

        # ✅ Step6 완료
        if context.get("stage") == "step6":
            final_message = "게시가 완료되었습니다! 수고 많으셨어요 😊"
            save_chat_message(db, user_id, RoleEnum.assistant, final_message)
            add_chat_to_redis(user_id, "assistant", final_message)
            return {"response": final_message}

        # ✅ 슬라이드 설명 추가 (Step3)
        slide_text = ""
        if context.get("stage") == "step3" and context.get("platform"):
            slide = get_slide_message(context["platform"], context.get("slide_idx", 0))
            slide_text = f"\n\n📘 슬라이드 설명: {slide.get('content')}\n🖼️ 이미지 경로: {slide.get('image')}"

        # 🔹 GPT 프롬프트 빌드 및 호출
        prompt = self.build_prompt(context, formatted_history, message, slide_text)
        gpt_response = call_chatgpt(user_id, prompt)

        # 🔹 응답 저장
        save_chat_message(db, user_id, RoleEnum.assistant, gpt_response)
        add_chat_to_redis(user_id, "assistant", gpt_response)

        return {"response": gpt_response}

    def update_context_from_message(self, user_id: str, message: str):
        context = get_user_context(user_id)
        msg = message.strip().lower()

        # ✅ 슬라이드 다음 단계 처리
        if context.get("stage") == "step3" and msg == "다음":
            current = context.get("slide_idx", 0)
            if not is_last_slide(context.get("platform"), current):
                update_user_context(user_id, {"slide_idx": current + 1})
            else:
                update_user_context(user_id, {"stage": "step4"})

        # ✅ 게시 대상 처리
        if context.get("stage") == "step5":
            if any(kw in msg for kw in ["국내", "1"]):
                target = "domestic"
            elif any(kw in msg for kw in ["해외", "2"]):
                target = "foreign"
            elif any(kw in msg for kw in ["둘 다", "3"]):
                target = "both"
            else:
                target = None

            if target:
                update_user_context(user_id, {"post_target": target, "stage": "step6"})

                user_id_int = int(user_id)
                asyncio.run(post_to_spring_board(
                    user_id=user_id_int,
                    title=context.get("post_title_kr", ""),
                    content=context.get("post_content_kr", ""),
                    translated_title=context.get("translated_title", ""),
                    translated_content=context.get("translated_content", ""),
                    target=target
                ))

    def build_prompt(self, context: dict, history: list, message: str, slide_text: str = "") -> str:
        history_text = "\n".join([f"{h['role']}: {h['content']}" for h in history])

        # ✅ Step1 국가 추천
        if context.get("stage") == "step1" and "item" in context:
            slide_text += self.get_step1_country_list_text(context["item"])

        # ✅ Step2 플랫폼 추천
        elif context.get("stage") == "step2" and "country" in context:
            slide_text += self.get_step2_platform_text(context["country"])

        return f"""
{SYSTEM_PROMPT}

지금까지의 대화:
{history_text}
{slide_text}

사용자 입력: "{message}"

문맥에 맞게 다음 질문으로 이어가거나, 사용자의 질문에 먼저 답한 뒤 다시 흐름으로 유도해줘.
"""

    def get_step1_country_list_text(self, item: str) -> str:
        results = get_top_country_details(item)
        if not results:
            return "\n\n❗ 해당 품목에 대한 수출 데이터를 찾을 수 없어요. 다시 입력해 주세요."

        table_header = "| 순위 | 국가 | 성공 확률 (%) | 추천 이유 |\n"
        table_divider = "|------|------|----------------|------------|\n"
        table_rows = [
            f"| {r['순위']} | {r['국가']} | {r['성공확률']}% | {r['추천이유']} |"
            for r in results
        ]
        table = "\n".join([table_header, table_divider] + table_rows)

        return f"\n\n📦 [수출 유망 국가 TOP 20 - {item} 기준]\n{table}\n\n💬 관심 있는 국가를 선택해 주세요!"

    def get_step2_platform_text(self, country: str) -> str:
        country = country.strip()

        is_shopee = country in SHOPEE_COUNTRIES
        is_amazon = True  # Amazon은 모든 국가 허용

        platforms = []
        if is_amazon:
            platforms.append("Amazon")
        if is_shopee:
            platforms.append("Shopee")

        # 플랫폼 설명 문구 생성
        if not platforms:
            return f"{country}에서는 현재 추천할 수 있는 대표적인 플랫폼이 없습니다. 다른 국가를 선택해보시는 것도 좋아요."

        if len(platforms) == 1:
            return f"{country}에서는 **{platforms[0]}** 플랫폼을 통해 판매하시는 것이 적절합니다. 이 플랫폼의 특징과 사용법을 알려드릴게요!"
        else:
            return f"{country}에서는 **Amazon**과 **Shopee** 두 플랫폼 모두 활용하실 수 있어요. 각각의 특징을 비교하고 선택하시면 좋겠습니다 😊"

    @staticmethod
    def convert_to_gpt_format(history):
        formatted = []
        for h in history:
            if isinstance(h, dict):
                formatted.append({
                    "role": h.get("role"),
                    "content": h.get("content")
                })
            else:  # ChatbotMessage 객체 (RDB)
                formatted.append({
                    "role": h.role.value if hasattr(h.role, "value") else h.role,
                    "content": h.content
                })
        return formatted
