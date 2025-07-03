from fastapi import APIRouter, Query
from app.utils.recommend import get_top_country_details
from app.services.recommend_core import recommend_core

router = APIRouter()

@router.get("/recommend")
def recommend_api(item: str, page: int = 1, size: int = 20):
    result = recommend_core(item, page, size)
    return result

# @router.get("/recommend")
# def recommend_api(item: str = Query(..., description="분석을 원하는 품목명")):
#    result = get_top_country_details(item)
#    return result   # 프론트에서 표/리스트로 바로 사용 가능