from fastapi import APIRouter
from .chatbot_api import router as chatbot_router

router = APIRouter()

router.include_router(chatbot_router)