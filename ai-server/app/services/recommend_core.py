import random
from app.core.state import app_state
from app.services.cache import get_search_result_from_db, save_search_result_to_db
from app.utils.vector_db import find_relevant_hs_codes_from_vector_db
from app.services.analysis import calculate_recommendation_score, generate_report_with_llm

def recommend_core(item: str, page: int = 1, size: int = 10) -> dict:
    # 1. 캐시 먼저 조회
    cached_result = get_search_result_from_db(item)
    if cached_result:
        print(f"'{item}'는 캐시에서 반환!")
        return cached_result

    # 2. 메모리/벡터DB 등에서 데이터 준비
    df_export = app_state.get("df_export")
    hscode_collection = app_state.get("hscode_collection")
    if df_export is None or hscode_collection is None:
        return {"error": "서버 데이터 준비 중"}

    # 3. 품목명으로 유사 HS코드 검색
    relevant_codes = find_relevant_hs_codes_from_vector_db(item, hscode_collection)
    if not relevant_codes:
        return {"error": f"'{item}'에 대한 품목 정보를 찾을 수 없습니다."}

    # 4. HS코드에 맞는 수출실적 데이터 추출
    filtered_export_data = df_export[df_export['HS코드'].isin(relevant_codes)]
    if filtered_export_data.empty:
        return {"error": f"검색된 HS코드({', '.join(relevant_codes)})에 대한 수출 실적 데이터가 없습니다."}

    # 5. 국가별 점수 계산
    ranked_countries_df = calculate_recommendation_score(filtered_export_data)
    if ranked_countries_df.empty:
        return {"error": "점수 계산 중 오류"}

    # 6. AI(LLM)로 국가별 추천 이유 분석
    top_20_countries_df = ranked_countries_df.head(20)
    llm_analysis_result = generate_report_with_llm(item, top_20_countries_df)
    country_key_factors = {d["country_name"]: d["key_factor"] for d in llm_analysis_result.get("country_analysis", [])}
    ranked_countries_df['key_factor'] = ranked_countries_df['국가'].map(country_key_factors)
    ranked_countries_df['key_factor'] = ranked_countries_df['key_factor'].fillna("분석 정보 없음")

    # 7. 점수 낮은 국가 경고문구 랜덤 삽입
    low_score_mask = ranked_countries_df['종합점수'] < 35
    if low_score_mask.any():
        warning_phrases = [
            "주의: 신중한 접근이 필요한 시장",
            "경고: 시장 진입 리스크 높음",
            "위험: 수익성 확보에 어려움 예상"
        ]
        num_low_scores = low_score_mask.sum()
        random_warnings = random.choices(warning_phrases, k=num_low_scores)
        ranked_countries_df.loc[low_score_mask, 'key_factor'] = random_warnings

    # 8. 점수 표기 변환 (20~90%로 조정)
    original_score = ranked_countries_df['종합점수']
    new_score = 20 + (original_score * 0.7)
    ranked_countries_df['recommendationScore'] = (round(new_score, 1)).astype(str) + '%'

    display_columns = ['국가', 'key_factor', 'recommendationScore']
    display_df = ranked_countries_df[display_columns].rename(columns={'국가': 'country'})
    display_df = display_df.reset_index(drop=True)
    display_df['rank'] = display_df.index + 1
    display_df = display_df[['rank', 'country', 'key_factor', 'recommendationScore']]
    
    total_items = len(display_df)
    start_index = (page - 1) * size
    end_index = start_index + size

    paginated_data = display_df.iloc[start_index:end_index]
    table_data = paginated_data.to_dict(orient='records')
    top_country_data = display_df.head(1).to_dict(orient='records')[0] if total_items > 0 else None

    response_data = {
        "pagination": {"page": page, "size": size, "total_items": total_items},
        "topCountryData": top_country_data,
        "tableData": table_data
    }

   # 9. 결과 캐시(DB)에 저장
    print(f"[DEBUG] 캐시 저장 함수 호출 직전: item={item}")
    save_search_result_to_db(item, response_data)
    print(f"[DEBUG] 캐시 저장 함수 호출 완료: item={item}")
    return response_data