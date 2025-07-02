from pydantic import BaseModel
from typing import Optional
from app.utils.jwt import verify_jwt_token
from app.services.chatbot_service import ChatbotService
from fastapi import APIRouter, Depends, Header, HTTPException
from app.repositories.chatbot_repository import get_chat_history
from app.utils.database import get_db
from sqlalchemy.orm import Session

router = APIRouter()

class ChatbotRequest(BaseModel):
    message: str

@router.post("/chatbot", tags=["GPT 챗봇 흐름"])
def chatbot(req: ChatbotRequest, authorization: str = Header(...)):
    try:
        # ✅ JWT 토큰 검증 및 user_id 추출
        user_id = verify_jwt_token(authorization)

        # ✅ 챗봇 서비스 호출
        service = ChatbotService()
        result = service.handle(user_id, req.message)

        return {
            "step": result.get("step"),
            "userId": user_id,
            "response": result.get("response"),
            "context": result.get("context"),
            "image": result.get("image"),
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/chatbot/history", tags=["챗봇 대화 이력"])
def get_chat_history(authorization: str = Header(...), db: Session = Depends(get_db)):
    user_id = verify_jwt_token(authorization)
    messages = get_chat_history(user_id, db)

    return [
        {
            "role": msg.role.value,
            "content": msg.content,
            "timestamp": msg.timestamp.isoformat(),
        }
        for msg in messages
    ]