from fastapi import APIRouter
from app.api.recommend_api import router as recommend_router

router = APIRouter()
router.include_router(recommend_router, prefix="/recommend", tags=["추천 API"])
