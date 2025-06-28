from .step1_recommend_api import router as step1_router
from .step2_platform_api import router as step2_router
from .step3_platform_api import router as step3_router

from fastapi import APIRouter

router = APIRouter()
router.include_router(step1_router, prefix="/recommend")
router.include_router(step2_router, prefix="/platform")
router.include_router(step3_router, prefix="/platform-guide")
