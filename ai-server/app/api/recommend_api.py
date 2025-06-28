from fastapi import APIRouter, HTTPException, Query
from app.core.state import app_state
from app.services.recommendation_service import recommend_export_country

router = APIRouter()

@router.get("/recommend")
def get_recommendation(item: str, page: int = 1, size: int = 10):
    df = app_state.get("df_export")
    collection = app_state.get("hscode_collection")

    if df is None or df.empty or collection is None:
        raise HTTPException(status_code=500, detail="데이터가 로딩되지 않았습니다.")

    return recommend_export_country(item, df, collection, page, size)
