import React, { createContext, useState } from 'react'

export const AmazonFormContext = createContext();

export const AmazonFormProvider = ({children}) => {
    const [formData, setFormData] = useState({
        // 📦 Product Identity
        variations: '',             // 🔘 radio (yes / no)
        productId: '',              // 🆔 상품 코드
        productIdType: '',          // 🔽 select (gtin, upc, asin)
        noProductId: false,         // ✅ checkbox (boolean)
        productName: '',            // 📝 상품명
        productNameEn: '',          // 영어 상품명 추가
        brandName: '',              // 📝 브랜드명
        brandNameEn: '',              // 영어 브랜드명
        noBrandName: false,         // 📝 브랜드명 없음
        // ☑️ checkbox: 브랜드명 없음 → 별도 처리 고려 가능

        // 💲 Offer
        yourPrice: '',              // 💲 판매가
        yourPriceEn: '',              // 💲 판매가
        listPrice: '',              // 💲 정가
        listPriceEn: '',              // 💲 정가
        itemCondition: '',          // 🔽 select (new / used)
        maxOrderQty: '',            // 🔢 최대 주문 수량
        fulfillment: '',            // 🔘 radio (fbm / fba)

        // 🔍 Keywords
        searchTerms: '',            // 🔑 키워드
        searchTermsEn: '',            // 🔑 키워드

        // 🖼️ Images → ImageBox에서 관리되므로 context에는 필요 시 별도 추가
        mainImage: '',

        // 📖 Description
        description: '',            // 📄 상품 설명
        descriptionEn: '',          // 영어 상품 설명 추가
        keyFeatures: '',            // ✅ 핵심 기능
        keyFeaturesEn: '',            // ✅ 핵심 기능

        // 📄 Compliance → 입력 필드 없음 (정보 안내만)

        // 📂 Vital Info
        manufacturer: '',           // 🏭 제조사
        manufacturerEn: '',           // 🏭 제조사
        manufacturerPartNumber: '',// 🔢 부품 번호
        isExpirable: '',            // 🔽 select (yes / no)
        numberOfItems: '',          // 🔢 제품 수량
        itemForm: '',               // 📦 제품 형태
        itemFormEn: '',               // 📦 제품 형태
        unitCount: '',              // 🔢 포장 단위 개수
        unitCountType: '',          // 📐 포장 단위 종류
        unitCountTypeEn: '',          // 📐 포장 단위 종류
        heatSensitive: '',          // 🔽 select (yes / no)

        // 🔹 Variations → 안내만 있고 입력 없음

        // 📝 More Details → 입력 없음 (카테고리 따라 안내만)
    });

    const updateField = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    }

    return (
        <AmazonFormContext.Provider value={{ formData, updateField }}>
            {children}
        </AmazonFormContext.Provider>
    );
}

export default AmazonFormContext