import React, { createContext, useState } from 'react'

const ShopeeFormContext = createContext();

export const ShopeeFormProvider = ({children}) => {
    const [formData, setFormData] = useState({});

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