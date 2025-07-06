import openai
import os

client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def gpt_translate_fields_dict(field_dict: dict) -> dict:
    if not field_dict:
        return {}

    # value 값만 추출, 한 줄씩 프롬프트에 넣음
    prompt = (
        "Translate the following fields to English. "
        "If a part is already in English, leave it unchanged. "
        "Return only the translations, one per line, in the same order:\n"
        "---\n" +
        "\n".join(str(v) for v in field_dict.values())
    )
    response = client.chat.completions.create(
        model="gpt-4.1",
        messages=[
            {"role": "system", "content": "You are a professional translator for online product listings."},
            {"role": "user", "content": prompt}
        ],
        max_tokens=512,
        temperature=0.2,
    )
    content = response.choices[0].message.content.strip()
    lines = [line.strip() for line in content.splitlines() if line.strip()]
    # key:value로 매핑해서 반환
    return dict(zip(field_dict.keys(), lines))