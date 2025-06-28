import json

def generate_report_with_llm(item_name, ranked_df):
    from app.core.vector_db import client
    prompt = f"""
    '{item_name}' 품목의 수출 데이터 기반으로 각 국가별 핵심 강점을 요약해줘:
    {ranked_df[['국가', '수출 금액', '무역수지', '종합점수']].head(20).to_string(index=False)}

    결과는 아래 형식의 JSON 객체로:
    {{"country_analysis": [{{"country_name": "국가명", "key_factor": "설명"}}, ...]}}
    """
    try:
        response = client.chat.completions.create(
            model="gpt-4.1",
            response_format={"type": "json_object"},
            messages=[{"role": "user", "content": prompt}],
            temperature=0.7
        )
        return json.loads(response.choices[0].message.content)
    except:
        return {"country_analysis": []}