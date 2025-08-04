# title_content_utils.py

import re
import json
from app.core.gpt_client import call_chatgpt

TRANSLATE_PROMPT = """
You are a professional translator.
Translate the following product posting into natural U.S. English and return ONLY valid JSON in the form:
{ "en_title": "...", "en_content": "..." }

제목: "{title}"
내용: "{content}"

반드시 위 JSON 한 줄로만 답하고, 추가 텍스트, 코드블럭, 예시, 주석, 설명, 안내 등은 절대 붙이지 마라.
"""

def translate_post(user_id: int, title_kr: str, content_kr: str) -> tuple:
    prompt = TRANSLATE_PROMPT.format(title=title_kr, content=content_kr)
    raw = call_chatgpt(user_id=user_id, system_prompt="", user_prompt=prompt, chat_history=[])
    result = parse_gpt_response_to_json(raw)
    return result.get("en_title", ""), result.get("en_content", "")


def parse_gpt_response_to_json(raw):
    try:
        data = json.loads(raw)
        if 'en_title' in data and 'en_content' in data:
            return {"en_title": data['en_title'].strip(), "en_content": data['en_content'].strip()}
    except Exception:
        pass

    title_match = re.search(r'(?:title|제목)[:：]\s*(.+)', raw, re.I)
    content_match = re.search(r'(?:content|내용)[:：]\s*([\s\S]+?)(?:\n[-*#]{3,}|\n$|$)', raw, re.I)
    return {
        "en_title": title_match.group(1).strip() if title_match else "[No Title]",
        "en_content": content_match.group(1).strip() if content_match else raw.strip()
    }


def extract_title_content_with_gpt(user_id: int, user_input: str) -> tuple:
    PROMPT = f"""
아래 입력에서 제목과 내용을 분리해 반드시 아래 한글 라벨로만 반환해줘.

제목: ...
내용: ...

- 라벨은 무조건 '제목:' '내용:'만 써라.
- 부가설명, 안내, 예시, 영문 라벨, 코드블럭 등 절대 넣지 마라.

입력: {user_input}
"""
    gpt_resp = call_chatgpt(user_id=user_id, system_prompt="", user_prompt=PROMPT, chat_history=[])
    return extract_title_content(gpt_resp)


def extract_title_content(gpt_resp: str) -> tuple:
    try:
        title_pattern = r"(?:제목)[:：]\s*(.+)"
        content_pattern = r"(?:내용)[:：]\s*([\s\S]+)"

        title_match = re.search(title_pattern, gpt_resp)
        content_match = re.search(content_pattern, gpt_resp)

        title_kr = title_match.group(1).strip() if title_match else ""
        content_kr = content_match.group(1).strip() if content_match else ""
        return title_kr, content_kr
    except Exception:
        return "", gpt_resp.strip()
