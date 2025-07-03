# app/utils/recommend.py

import os
from app.utils.io import load_and_clean_export_data
from app.utils.scoring import calculate_recommendation_score
from app.services.cache import save_search_result_to_db, get_search_result_from_db

def get_top_country_details(item: str, top_n: int = 20) -> list[dict]:
    cached = get_search_result_from_db(item)
    if cached and "tableData" in cached:
        print(f"[CACHE HIT] '{item}' 추천 국가 {top_n}개 캐시에서 반환")
        return cached["tableData"][:top_n]
    
    project_root = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    export_data_path = os.path.join(project_root, "export_data_2025_clean.json")
    df = load_and_clean_export_data(export_data_path)
    item_df = df[df['품목명'].str.contains(item, case=False, na=False)]

    if item_df.empty:
        return []

    ranked_df = calculate_recommendation_score(item_df)
    ranked_df = ranked_df.sort_values(by="종합점수", ascending=False).head(top_n)
    country_list = ranked_df["국가"].tolist()
    
    # ✅ 종합점수를 성공확률로 사용 (0~100 사이로 이미 스케일됨)
    

    result = []
    for idx, row in ranked_df.iterrows():
        result.append({
            "순위": len(result) + 1,
            "국가": row["국가"],
            "성공확률": f"{round(row['종합점수'], 2)}%",
            "추천이유": "수출 금액과 무역수지를 종합 평가한 결과입니다."
        })

    # ✅ 래핑해서 저장!
    cache_result = {
        "tableData": result
    }
    save_search_result_to_db(item, cache_result)
    return result

