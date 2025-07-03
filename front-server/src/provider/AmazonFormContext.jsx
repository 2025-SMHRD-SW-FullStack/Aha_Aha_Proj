import React, { createContext, useState } from 'react'

const AmazonFormContext = createContext();

export const AmazonFormProvider = ({children}) => {
    const [formData, setFormData] = useState({});

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