# app/repositories/chatbot_repository.py

from sqlalchemy.orm import Session
from app.models.chatbot_message import ChatbotMessage, RoleEnum

# ✅ 메시지 저장
def save_chat_message(db: Session, user_id: str, role: RoleEnum, content: str):
    message = ChatbotMessage(
        user_id=user_id,
        role=role,
        content=content
    )
    db.add(message)
    db.commit()

# ✅ 최신 메시지 N개 조회 (최근 → 오래된 순으로 반환)
def get_recent_messages(db: Session, user_id: str, limit: int = 6):
    return (
        db.query(ChatbotMessage)
        .filter(ChatbotMessage.user_id == user_id)
        .order_by(ChatbotMessage.created_at.desc())
        .limit(limit)
        .all()[::-1]  # 최신순 정렬 후 역순으로 반환
    )

# ✅ 전체 대화 히스토리 조회 (timestamp 기준 최신순)
def get_chat_history(db: Session, user_id: str):
    return (
        db.query(ChatbotMessage)
        .filter(ChatbotMessage.user_id == user_id)
        .order_by(ChatbotMessage.timestamp.desc())
        .all()
    )
