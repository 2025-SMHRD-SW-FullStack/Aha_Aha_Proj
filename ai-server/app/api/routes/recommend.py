from fastapi import APIRouter, Header, HTTPException, Query
from app.utils.recommend import get_top_country_details
from app.services.recommend_core import recommend_core
from app.utils.jwt import verify_jwt_token


router = APIRouter()

@router.get("/recommend")
def recommend_api(item: str, page: int = 1, size: int = 20, authorization: str = Header(...)):
    
    verify_jwt_token(authorization)
    
    try:
        result = recommend_core(item, page, size)
        if not result or len(result.get("data", [])) == 0:
            raise HTTPException(status_code=404, detail="추천 결과가 없습니다.")
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
    
    # result = recommend_core(item, page, size)
    # return result

# @router.get("/recommend")
# def recommend_api(item: str = Query(..., description="분석을 원하는 품목명")):
#    result = get_top_country_details(item)
#    return result   # 프론트에서 표/리스트로 바로 사용 가능