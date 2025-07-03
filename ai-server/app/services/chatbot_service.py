from app.core.gpt_client import call_chatgpt
from app.services.chatbot_state import get_user_context, add_chat_to_redis, get_chat_history
from app.repositories.chatbot_repository import save_chat_message
from app.models.chatbot_message import RoleEnum, ChatbotMessage
from sqlalchemy.orm import Session
from app.utils.recommend import get_top_country_details
from app.constants.shopee_countries import SHOPEE_COUNTRIES

MAX_HISTORY = 6

class ChatbotService:
    def handle(self, db: Session, user_id: str, message: str) -> dict:
        # ✅ 사용자 메시지 저장
        save_chat_message(db, user_id, RoleEnum.user, message)
        add_chat_to_redis(user_id, "user", message)

        # ✅ 대화 이력
        chat_history = get_chat_history(user_id)[:MAX_HISTORY]

        # ✅ 최근 assistant 응답에서 국가 리스트를 보여줬는지 판단
        last_assistant_msg = next((m['content'] for m in reversed(chat_history) if m['role'] == 'assistant'), "")
        if "추천 국가 TOP" in last_assistant_msg:
            selected_country = message.strip()

            if selected_country:  # 국가명 입력했다고 간주
                has_shopee = selected_country in SHOPEE_COUNTRIES
                recommended_platforms = ["Amazon"]
                if has_shopee:
                    recommended_platforms.append("Shopee")

                platform_text = "✅ " + ", ".join(recommended_platforms)
                shopee_note = (
                    f"(Amazon은 글로벌 플랫폼이며, Shopee는 {selected_country}을 포함한 동남아/남미 시장에 특화된 플랫폼입니다.)"
                    if has_shopee else "(Amazon은 글로벌 플랫폼입니다.)"
                )

                gpt_response = (
                    f"🌍 {selected_country}을(를) 선택해 주셨군요!\n"
                    f"{platform_text} {shopee_note}\n\n"
                    f"아래 옵션 중 하나를 선택해 주세요:\n"
                    f"1. Amazon\n"
                    f"2. Shopee\n"
                    f"3. 둘 다"
                )

                save_chat_message(db, user_id, RoleEnum.assistant, gpt_response)
                add_chat_to_redis(user_id, "assistant", gpt_response)
                return {"response": gpt_response}

        # ✅ 품목 추출 (이전과 동일)
        extract_prompt = f"""사용자와의 대화에서 수출하려는 품목이 무엇인지 파악해줘.
없으면 "없음"이라고만 답하고, 있으면 품목명만 한 단어로 추출해줘.
예시: "비누 팔고 싶은데" → "비누"
사용자 입력: "{message}"
"""
        item_response = call_chatgpt(user_id, extract_prompt).strip()
        item_name = item_response if item_response.lower() != "없음" else None

        if item_name:
            country_details = get_top_country_details(item_name, top_n=20)
            if country_details:
                message = f"🧠 아래는 '{item_name}' 품목에 대한 추천 국가 TOP 20입니다:\n\n"
                for c in country_details:
                    message += f"{c['순위']}. {c['국가']} - 성공확률 {c['성공확률']}%: {c['추천이유']}\n"
                message += "\n이 중에 관심 있는 국가가 있으신가요?"

                gpt_response = message
            else:
                gpt_response = f'"{item_name}"에 대한 수출 데이터를 찾지 못했어요. 다른 품목을 말씀해 주실 수 있을까요?'
        else:
            formatted_history = "\n".join(
                [f"{msg['role']}: {msg['content']}" for msg in chat_history]
            )
            prompt = f"""사용자와의 대화는 다음과 같고, 품목이 명확하지 않아요.
{formatted_history}
이럴 때는 친절하게 어떤 품목을 수출하고 싶은지 되물어보는 응답을 해줘."""
            gpt_response = call_chatgpt(user_id, prompt)

        # ✅ 응답 저장
        save_chat_message(db, user_id, RoleEnum.assistant, gpt_response)
        add_chat_to_redis(user_id, "assistant", gpt_response)

        return {"response": gpt_response}


    @staticmethod
    def convert_to_gpt_format(history):
        return [
            {"role": h.role.value if hasattr(h.role, "value") else h.role, "content": h.content}
            for h in history
        ]

    @staticmethod
    def save_message(db, user_id, role, content):
        if hasattr(role, "value"):
            role = role.value
        db.add(ChatbotMessage(user_id=user_id, role=role, content=content))
        db.commit()

    @staticmethod
    def get_recent_messages(db, user_id, limit=10):
        return (
            db.query(ChatbotMessage)
            .filter(ChatbotMessage.user_id == user_id)
            .order_by(ChatbotMessage.created_at.asc())
            .limit(limit)
            .all()
        )
