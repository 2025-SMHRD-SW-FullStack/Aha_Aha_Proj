# app/services/step3_platform_guide.py

from typing import List, Dict

def get_platform_guide(country: str, platforms: List[str]) -> List[Dict]:
    guides = []

    for platform in platforms:
        if platform.lower() == "amazon":
            guides.append({
                "platform": "Amazon",
                "guide": f"""
[Amazon {country} 판매 가이드]

1. 아마존 셀러 계정 생성
2. 사업자 등록 정보 제출
3. 세금 정보 입력 (VAT 등)
4. 상품 등록 및 FBA(또는 FBM) 선택
5. 현지 배송 파트너 연동 또는 Fulfillment 등록
6. 통관 관련 서류 준비
""",
                "note": f"Amazon은 {country}에서 직접 입점이 제한되거나 추가 심사 절차가 요구될 수 있습니다."
            })
        elif platform.lower() == "shopee":
            guides.append({
                "platform": "Shopee",
                "guide": f"""
[Shopee {country} 입점 가이드]

1. Shopee 글로벌 셀러 가입 (https://seller.shopee.com)
2. {country} 타겟 국가 선택
3. 상품 등록 (언어는 자동 번역 지원됨)
4. 물류: Shopee Logistics 서비스 활용 또는 현지 물류 대행사 연동
5. 주문 및 CS는 Shopee 플랫폼에서 자동 관리
""",
                "note": f"{country}는 Shopee에서 인기 높은 시장이며, 특히 한국 제품 수요가 높습니다."
            })
        else:
            guides.append({
                "platform": platform,
                "guide": "❌ 아직 이 플랫폼에 대한 가이드는 준비되지 않았습니다.",
                "note": "향후 업데이트 예정입니다."
            })

    return guides
