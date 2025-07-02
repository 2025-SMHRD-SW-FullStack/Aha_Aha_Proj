from app.core.gpt_client import call_chatgpt
from app.services.chatbot_state import get_user_context, add_chat_to_redis, get_chat_history
from app.utils.recommend import get_top_countries_for_item
from app.repositories.chatbot_repository import save_chat_message
from app.models.chatbot_message import RoleEnum, ChatbotMessage
from sqlalchemy.orm import Session

MAX_HISTORY = 6

class ChatbotService:
    def handle(self, db: Session, user_id: str, message: str) -> dict:
        # ✅ 사용자 메시지 저장
        save_chat_message(db, user_id, RoleEnum.user, message)
        add_chat_to_redis(user_id, "user", message)

        # ✅ 최근 대화 이력 불러오기
        # ✅ Redis에서 최근 MAX_HISTORY개만 가져오도록 함수 내에서 슬라이싱
        chat_history = get_chat_history(user_id)[:MAX_HISTORY]


        # ✅ GPT로부터 품목 추출
        extract_prompt = f"""사용자와의 대화에서 수출하려는 품목이 무엇인지 파악해줘.
없으면 "없음"이라고만 답하고, 있으면 품목명만 한 단어로 추출해줘.
예시: "비누 팔고 싶은데" → "비누"
사용자 입력: "{message}"
"""
        item_response = call_chatgpt(user_id, extract_prompt).strip()
        item_name = item_response if item_response.lower() != "없음" else None

        # ✅ GPT 응답 생성
        if item_name:
            countries = get_top_countries_for_item(item_name)
            if countries:
                prompt = f"""사용자가 "{item_name}" 품목을 수출하려고 합니다.
다음은 추천 국가입니다: {', '.join(countries)}
각 국가가 추천되는 이유를 초보자도 이해하기 쉽게 설명하고, 사용자에게 어느 국가가 궁금한지 질문해줘."""
                gpt_response = call_chatgpt(user_id, prompt)
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
