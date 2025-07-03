import json
from app.core.gpt_client import call_chatgpt  # GPT 호출 분리
import pandas as pd

def generate_report_with_llm(item_name: str, ranked_df: pd.DataFrame) -> dict:
    try:
        # 🔹 GPT 프롬프트 구성
        top_countries_str = ranked_df[["국가", "수출 금액", "무역수지", "종합점수"]].head(20).to_string(index=False)

        prompt = f"""
'{item_name}' 품목의 수출 데이터를 기반으로 각 국가별 핵심 강점을 요약해줘.

다음은 상위 국가들의 수출 데이터입니다:

{top_countries_str}

응답은 반드시 아래 형식의 JSON으로 작성해줘:
{{
  "country_analysis": [
    {{"country_name": "국가명", "key_factor": "설명"}},
    ...
  ]
}}
        """.strip()

        print("🧠 GPT 국가 분석 요청 프롬프트:", prompt)

        gpt_response = call_chatgpt(prompt)

        # 🔹 JSON 파싱 시도
        parsed = json.loads(gpt_response)
        if "country_analysis" not in parsed:
            raise ValueError("country_analysis 키가 없음")

        return parsed

    except Exception as e:
        print(f"⚠️ 국가 분석 GPT 호출 실패: {e}")
        return {"country_analysis": []}
