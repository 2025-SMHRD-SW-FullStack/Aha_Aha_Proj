import openai
import os

client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def gpt_translate_fields_dict(field_dict: dict) -> dict:
    # 1) 번역 대상(빈 문자열 제외)만 뽑아서 순서 보존
    to_translate = {
        k: v for k, v in field_dict.items()
        if isinstance(v, str) and v.strip()
    }
    if not to_translate:
        return {}  # 번역할 게 없으면 빈 dict

    # 2) 번역할 값만 프롬프트에 한 줄씩
    prompt = (
        "Translate the following to English. "
        "If already English, leave it unchanged. "
        "Return one translation per line, in the same order:\n---\n"
        + "\n".join(to_translate.values())
    )

    response = client.chat.completions.create(
        model="gpt-4.1",
        messages=[
            {"role": "system", "content": "You are a professional translator."},
            {"role": "user",   "content": prompt}
        ],
        max_tokens=512,
        temperature=0.2,
    )

    # 3) 응답 라인 분리
    lines = [line.strip()
        for line in response.choices[0].message.content.splitlines() 
        if line.strip()]

    # 4) 번역된 값만 키 순서에 맞춰 매핑
    translated = dict(zip(to_translate.keys(), lines))

    # 5) 원본 field_dict 전체와 병합
    return { **field_dict, **translated }