from fastapi import HTTPException

def recommend_platforms_by_country(country: str) -> list[dict]:
    country = country.strip().lower()
    result = []

    shopee_countries = {
        "싱가포르", "말레이시아", "필리핀", "베트남", "태국", "대만",
        "브라질", "멕시코", "인도네시아"
    }

    if country in map(str.lower, shopee_countries):
        result.append({
            "platform": "Shopee",
            "reason": "Shopee는 동남아 및 일부 남미 시장에서 강력한 점유율을 보이는 플랫폼입니다."
        })

    # Amazon은 글로벌 판매자 기본 추천
    result.append({
        "platform": "Amazon",
        "reason": "Amazon은 글로벌 판매자를 위한 대표 이커머스 플랫폼입니다."
    })

    if not result:
        raise HTTPException(status_code=404, detail="해당 국가에 대한 추천 플랫폼이 없습니다.")

    return result
