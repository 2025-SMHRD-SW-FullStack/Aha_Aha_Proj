from fastapi import APIRouter, Query
from app.services.step2_platform import recommend_platforms_by_country

router = APIRouter()

@router.get("/platforms/recommend", tags=["2단계: 플랫폼 추천"])
def get_recommended_platforms(country: str = Query(..., description="선택된 수출 대상 국가")):
    return {
        "recommendedPlatforms": recommend_platforms_by_country(country)
    }
