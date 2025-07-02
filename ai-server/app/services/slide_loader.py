import json

def load_slides(platform: str) -> list[dict]:
    """
    특정 플랫폼의 슬라이드 JSON 파일을 로드
    예: amazon, shopee 등
    """
    try:
        with open(f"app/data/{platform}_slides.json", "r", encoding="utf-8") as f:
            return json.load(f)
    except FileNotFoundError:
        raise FileNotFoundError(f"{platform}_slides.json 파일을 찾을 수 없습니다.")
