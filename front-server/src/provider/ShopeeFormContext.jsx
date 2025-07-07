import React, { createContext, useState } from 'react'

const ShopeeFormContext = createContext();

export const ShopeeFormProvider = ({children}) => {
    const [formData, setFormData] = useState({
        // 📝 ShopeeStep2
        productName: '',        // 🔤 상품명
        productNameEn: '',      // 영어 상품명 추가
        Category: '',           // 📂 카테고리

        // 🖼️ ShopeeStep3
        description: '',        // 📜 상세 설명 (textarea)
        descriptionEn: '',      // 영어 상세 설명 추가
        mainImage: '',

        // 💰 ShopeeStep4
        yourPrice: '',              // 💲 가격
        Stock: '',              // 📦 재고
        Name: '',               // 🏷️ 옵션 이름 (예: Color)
        NameEn: '',               // 🏷️ 옵션 이름 (예: Color)
        Options: '',            // 🧩 옵션 값 (예: Red, Blue)
        OptionsEn: '',            // 🧩 옵션 값 (예: Red, Blue)

        // ⚙️ ShopeeStep5
        Weight: '',             // ⚖️ 무게 (예: 0.5kg)
        ParcelWidth: '',        // 📏 가로(cm)
        ParcelLength: '',       // 📏 세로(cm)
        ParcelHeight: '',       // 📏 높이(cm)

    });

    const updateField = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    }


    return (
        <ShopeeFormContext.Provider value={{ formData, updateField }}>
            {children}
        </ShopeeFormContext.Provider>
    )
}

export default ShopeeFormContext