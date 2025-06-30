from fastapi import APIRouter, Query
from typing import List
from app.services.step3_platform_guide import get_platform_guide

router = APIRouter()

@router.get("/platform-guide", tags=["3단계: 플랫폼 가이드"])
def platform_guide(
    country: str = Query(..., description="수출 대상 국가"),
    platforms: List[str] = Query(..., description="선택한 플랫폼 리스트 (예: amazon, shopee)")
):
    """
    선택된 국가와 플랫폼 리스트를 기반으로 상세 입점 절차 가이드를 제공
    """
    result = get_platform_guide(country, platforms)
    return {"guides": result}
