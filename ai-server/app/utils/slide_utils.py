import re

def split_slide_message(raw_text):
    if not isinstance(raw_text, str):
        raw_text = str(raw_text)

    try:
        # ✅ 이미지 경로 추출 (마크다운 또는 http(s)://로 시작해서 .png로 끝나는 문자열)
        image_url = None
        # 마크다운 형식
        md_match = re.search(r'!\[\]\((https?://[^\s]+\.png)\)', raw_text)
        # 일반 링크 형식
        url_match = re.search(r'(https?://[^\s]+\.png)', raw_text)

        if md_match:
            image_url = md_match.group(1)
        elif url_match:
            image_url = url_match.group(1)

        # 이미지 제거한 텍스트
        text_only = re.sub(r'!\[\]\(https?://[^\s]+\.png\)', '', raw_text)
        text_only = re.sub(r'(https?://[^\s]+\.png)', '', text_only).strip()

        # 메시지 리스트 구성
        messages = []
        if image_url:
            messages.append({
                "role": "assistant",
                "type": "image",
                "content": image_url
            })
        if text_only:
            messages.append({
                "role": "assistant",
                "type": "text",
                "content": text_only
            })

        # 아무것도 없으면 fallback
        if not messages:
            messages.append({
                "role": "assistant",
                "type": "text",
                "content": "메시지를 처리할 수 없습니다. 다시 시도해주세요."
            })

        return messages
    except Exception as e:
        print("❌ split_slide_message 예외 발생:", str(e))
        return [{
            "role": "assistant",
            "type": "text",
            "content": "메시지를 처리하는 중 오류가 발생했습니다. 다시 시도해주세요."
        }]
