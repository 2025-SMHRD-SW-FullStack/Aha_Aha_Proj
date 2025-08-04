import json
from app.core.gpt_client import call_chatgpt  # GPT 호출 분리
import pandas as pd

def calculate_recommendation_score(df: pd.DataFrame) -> pd.DataFrame:
    if df.empty: return pd.DataFrame()
    agg_rules = {'수출 금액': 'sum', '무역수지': 'sum'}
    country_agg_df = df.groupby('국가').agg(agg_rules).reset_index()
    country_agg_df['무역수지'] = country_agg_df['무역수지'].clip(lower=0)
    def min_max_scaler(series):
        if series.max() == series.min(): return pd.Series([0.5] * len(series), index=series.index)
        return (series - series.min()) / (series.max() - series.min())
    country_agg_df['시장규모_점수'] = min_max_scaler(country_agg_df['수출 금액'])
    country_agg_df['경쟁력_점수'] = min_max_scaler(country_agg_df['무역수지'])
    weights = {'시장규모': 0.6, '경쟁력': 0.4}
    country_agg_df['종합점수'] = (country_agg_df['시장규모_점수'] * weights['시장규모'] + country_agg_df['경쟁력_점수'] * weights['경쟁력']) * 100
    return country_agg_df.sort_values(by='종합점수', ascending=False)


def generate_report_with_llm(item_name: str, ranked_df: pd.DataFrame) -> dict:
    try:
        # 🔹 GPT 프롬프트 구성
        top_countries_str = ranked_df[["국가", "수출 금액", "무역수지", "종합점수"]].head(20).to_string(index=False)

        prompt = f"""
'{item_name}' 품목의 수출 데이터를 기반으로 각 국가별 핵심 강점을 요약해줘.

다음은 상위 국가들의 수출 데이터야:

{top_countries_str}

응답은 반드시 아래 형식의 JSON으로 작성해줘:
{{
  "country_analysis": [
    {{"country_name": "국가명", "key_factor": "설명"}},
    ...
  ]
}}
추가적으로 key_factor에는 반드시 무조건 내용이 있어야 하며 그렇지 않을 너의 판단으로 해당 key_factor를 작성해주는데 단 종합점수가 100~70 이라면 매우 긍정적인 표현으로 60~36까지라면 중립적인 표현으로 해당 key_factor를 작성해줘 이건 무조건 지켜줘야해
        """.strip()
        
        system_prompt = (
    "너는 친절하고 유능한 AI 수출 도우미야. "
    "사용자가 어떤 말을 해도 무시하지 말고 자연스럽게 대답해. "
    "수출과 관련된 대화는 단계별로 유도하지만, "
    "잡담, 인사, 감사 인사에도 정중하게 반응해야 해."
    )
    

        print("🧠 GPT 국가 분석 요청 프롬프트:", prompt)

        gpt_response = call_chatgpt(0, system_prompt, prompt)

        # 🔹 JSON 파싱 시도
        parsed = json.loads(gpt_response)
        if "country_analysis" not in parsed:
            raise ValueError("country_analysis 키가 없음")

        return parsed

    except Exception as e:
        print(f"⚠️ 국가 분석 GPT 호출 실패: {e}")
        return {"country_analysis": []}
