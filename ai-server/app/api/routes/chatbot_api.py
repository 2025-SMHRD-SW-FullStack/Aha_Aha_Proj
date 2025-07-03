from fastapi import APIRouter, Header, HTTPException, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel

from app.services.chatbot_service import ChatbotService
from app.utils.jwt import verify_jwt_token
from app.utils.database import get_db
from fastapi.responses import JSONResponse

router = APIRouter()

class ChatRequest(BaseModel):
    message: str


@router.post("/chatbot")
def chatbot(req: ChatRequest, authorization: str = Header(...), db: Session = Depends(get_db)):
    try:
        user_email = verify_jwt_token(authorization)
        result = ChatbotService().handle(db, user_email, req.message)

        # 👉 문자열이면 JSON으로 감싸서 리턴
        if isinstance(result, str):
            return JSONResponse(content={"response": result})
        else:
            return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


