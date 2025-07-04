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
너는 사용자의 수출을 도와주는 친절하고 유능한 AI 챗봇이야. GlobalGo 플랫폼에서 활동하며, 다음과 같은 흐름으로 사용자를 도와야 해:

🧭 전체 단계 흐름:
1. 품목 입력 → 수출 유망 국가 추천 (TOP 20, 표 형식으로 제공)
2. 국가 선택 → 해당 국가에서 활용할 수 있는 이커머스 플랫폼 추천 (Amazon, Shopee 2개만 추천)
3. 플랫폼 선택 → 해당 플랫폼의 수출 가이드를 슬라이드 형식(이미지 + 설명)으로 하나씩 설명
4. 판매글 입력 (제목 + 내용) → 영어 번역 제공
5. 게시판 등록 여부 확인 (국내 / 해외 / 둘 다) → 자동 등록 처리
6. 마무리 안내 ("게시 완료! 수고 많으셨어요 😊")

📊 [중요] 국가 추천 시 표 형식 출력:
가능하면 마크다운 표 형식으로 정리해서 보여줘. 예시는 다음과 같아:

| 순위 | 국가 | 성공 확률 (%) | 추천 이유 |
|------|------|----------------|------------|
| 1 | 미국 | 83.2% | 시장이 크고 친환경 제품 선호도가 높아요 |
| 2 | 일본 | 76.5% | K-뷰티와 관련 제품에 대한 수요가 높아요 |
| 3 | 중국 | 70.4% | 대규모 소비 시장이 형성되어 있어요 |

※ 표가 너무 길면 상위 3~5개만 먼저 보여주고, "더 보기" 요청 시 나머지를 이어서 설명해도 좋아.

🧠 문맥 유도 기능:
- 사용자가 순서를 정확히 따르지 않아도 문맥을 자연스럽게 이어가야 해.
- "아마존", "쇼피" 같은 단어만 말해도 플랫폼 선택으로 이해하고 진행해.
- "전시관", "1", "2", "다음" 같은 짧은 말도 맥락에 따라 해석해서 대응해.
- "세금 얼마나 붙어?", "비용 많아?" 같은 질문이 들어오면 먼저 친절하게 답한 후 원래 흐름으로 자연스럽게 유도해줘.
- 사용자의 감정, 불안, 칭찬, 농담 등도 자연스럽게 반응하고 존중해줘.

💬 말투 스타일:
- 말투는 따뜻하고 친근하게, 부드럽고 명확한 어조로 설명해줘.
- 과한 이모지는 피하되, 흐름을 돕는 이모지(😊, 💬, 📦, ✅ 등)는 적절히 활용해줘.
- 초보자도 이해할 수 있도록 용어는 쉽게 설명해주고, 필요한 경우 예시도 들어줘.

예를 들어:
- "비누 수출하려고 하는데 어디가 좋아?" → TOP 국가 추천 표 제공
- "미국" → 해당 국가 플랫폼 추천
- "아마존" → 슬라이드 가이드 시작
- "다음" → 다음 슬라이드 보여줘
- "전시관에 올려줘" → 해외 게시판 자동 등록
- "질문 있어요" → 질문에 친절히 답한 후 흐름 복귀

언제나 사용자가 부담 없이 이야기할 수 있도록 진심을 담은 AI 친구처럼 대응해줘.
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

            slide_text += f"""
📘 [슬라이드 {context.get('slide_idx', 0) + 1}] {slide.get('title')}
{slide.get('content')}

🖼️ 이미지: {slide.get('image')}

"다음"이라고 입력하면 다음 슬라이드로 넘어가요!
궁금한 점이 있다면 언제든 질문해주세요 😊
"""

        # 🔹 GPT 프롬프트 빌드 및 호출
        prompt = self.build_prompt(context, formatted_history, message, slide_text)
        gpt_response = call_chatgpt(
            user_id=user_id,
            system_prompt=SYSTEM_PROMPT,
            user_prompt=message,
            chat_history=formatted_history
        )

        # 🔹 응답 저장
        save_chat_message(db, user_id, RoleEnum.assistant, gpt_response)
        add_chat_to_redis(user_id, "assistant", gpt_response)

        # ✅ 응답 결과 구성
        result = {
            "response": gpt_response
        }

        # ✅ 슬라이드 이미지 포함 (step3일 때만)
        if context.get("stage") == "step3" and context.get("platform"):
            slide = get_slide_message(context["platform"], context.get("slide_idx", 0))
            result["image"] = slide.get("image", "")

        return result

    def update_context_from_message(self, user_id: str, message: str):
        context = get_user_context(user_id)
        msg = message.strip().lower()

        # ✅ step3: 슬라이드 다음
        if context.get("stage") == "step3" and msg in ["다음", "next", "다음 슬라이드", "넘겨줘"]:
            current = context.get("slide_idx", 0)
            if not is_last_slide(context.get("platform"), current):
                update_user_context(user_id, {"slide_idx": current + 1})
            else:
                update_user_context(user_id, {"stage": "step4"})
            return

        # ✅ step5: 게시 대상 선택
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
            return

        # ✅ step0 → step1: item 저장
        if context.get("stage") in [None, "start"] and "item" not in context:
            update_user_context(user_id, {"item": message, "stage": "step1"})
            return

        # ✅ step1 → step2: country 저장
        if context.get("stage") == "step1" and "country" not in context:
            update_user_context(user_id, {"country": message, "stage": "step2"})
            return

        # ✅ step2 → step3: platform 저장
        if context.get("stage") == "step2" and "platform" not in context:
            platform = None
            if "amazon" in msg or "아마존" in msg or msg == "1":
                platform = "amazon"
            elif "shopee" in msg or "쇼피" in msg or msg == "2":
                platform = "shopee"

            if platform:
                update_user_context(user_id, {"platform": platform, "stage": "step3", "slide_idx": 0})
            return


    def build_prompt(self, context: dict, history: list, message: str, slide_text: str = "") -> str:
        # 🔵 원래는 전체 prompt 만들어서 return 했지만
        # ✅ 이제는 "GPT 시스템 지시문"만 반환하면 됨
        # 참고로 slide_text는 system_prompt 안에서 붙일 수 있음

        # Step1 국가 추천 → 슬라이드 텍스트 붙이기
        if context.get("stage") == "step1" and "item" in context:
            slide_text += self.get_step1_country_list_text(context["item"])

        # Step2 플랫폼 추천
        elif context.get("stage") == "step2" and "country" in context:
            slide_text += self.get_step2_platform_text(context["country"])

        return SYSTEM_PROMPT + "\n\n" + slide_text

    def get_step1_country_list_text(self, item: str) -> str:
        results = get_top_country_details(item)
        if not results:
            return "\n\n❗ 해당 품목에 대한 수출 데이터를 찾을 수 없어요. 다시 입력해 주세요."

        lines = [
            f"{r['순위']}. {r['국가']} ({r['성공확률']}%) - {r['추천이유']}"
            for r in results
        ]
        text = "\n".join(lines)

        return f"\n\n📦 [수출 유망 국가 TOP 20 - {item} 기준]\n{text}\n\n💬 관심 있는 국가를 선택해 주세요!"

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
