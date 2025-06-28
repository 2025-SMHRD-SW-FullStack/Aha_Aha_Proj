from fastapi import HTTPException
from app.core.vector_db import client
from app.utils.scoring import calculate_recommendation_score
from app.services.analysis import generate_report_with_llm
import random
import pandas as pd

def recommend_export_country(item, df_export, collection, page, size):
    if df_export is None or df_export.empty:
        raise HTTPException(status_code=500, detail="수출 데이터가 비어 있습니다.")

    # 🔹 Step 1: 임베딩 생성 및 벡터DB 질의
    query_embedding = client.embeddings.create(input=[item], model="text-embedding-3-small").data[0].embedding
    results = collection.query(query_embeddings=[query_embedding], n_results=30)

    print(f"\n🧠 검색어: {item}")
    print("📄 Top 30 결과:")
    for doc, meta in zip(results['documents'][0], results['metadatas'][0]):
        print(f"- {doc} / hscode={meta.get('hscode')}")

    matched_codes = set()

    # 🔸 Step 2: 포함 문자열 필터 + 유사도 fallback
    for doc, meta in zip(results['documents'][0], results['metadatas'][0]):
        if item in doc:
            matched_codes.add(meta.get('hscode', '')[:2].zfill(2))
        elif len(matched_codes) < 5:
            matched_codes.add(meta.get('hscode', '')[:2].zfill(2))

    if not matched_codes:
        raise HTTPException(status_code=404, detail=f"'{item}' 품목을 찾을 수 없습니다.")

    # 🔹 Step 3: 수출 데이터 필터링
    filtered_df = df_export[df_export['HS코드'].isin(matched_codes)]
    if filtered_df.empty:
        raise HTTPException(status_code=404, detail="해당 HS코드에 대한 수출 실적이 없습니다.")

    # 🔹 Step 4: 점수 계산 및 정렬
    scored_df = calculate_recommendation_score(filtered_df)
    scored_df = scored_df.sort_values(by='종합점수', ascending=False)

    # 🔹 Step 5: LLM 기반 요약 분석
    try:
        analysis = generate_report_with_llm(item, scored_df.head(20))
    except Exception:
        analysis = {"country_analysis": []}

    factor_map = {x['country_name']: x['key_factor'] for x in analysis.get('country_analysis', [])}
    scored_df['key_factor'] = scored_df['국가'].map(factor_map).fillna("분석 정보 없음")

    # 🔸 위험 국가 워닝
    low_mask = scored_df['종합점수'] < 35
    if low_mask.any():
        warnings = ["주의: 신중한 접근이 필요한 시장", "경고: 리스크 있음"]
        scored_df.loc[low_mask, 'key_factor'] = random.choices(warnings, k=low_mask.sum())

    # 🔹 성공률 + 순위 추가
    scored_df['recommendationScore'] = (20 + scored_df['종합점수'] * 0.7).round(1).astype(str) + '%'
    scored_df = scored_df.reset_index(drop=True)
    scored_df['rank'] = scored_df.index + 1

    # 🔹 결과 필드 구성
    result_df = scored_df[['rank', '국가', 'recommendationScore', 'key_factor']].rename(columns={
        '국가': 'country'
    })

    total = len(result_df)
    start = (page - 1) * size
    data = result_df.iloc[start:start+size].to_dict(orient='records')
    top = result_df.head(1).to_dict(orient='records')[0] if total > 0 else None

    return {
        "pagination": {"page": page, "size": size, "total_items": total},
        "topCountryData": top,
        "tableData": data
    }
