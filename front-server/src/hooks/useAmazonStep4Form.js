import { useState } from "react";

const useAmazonStep4Form = () => {
    const [formData, setFormData] = useState({
        // Product Identity
        variations: '',
        productId: '',
        productIdType: '',
        hasNoProductId: false,
        productName: '',
        brandName: '',
        hasNoBrandName: false,

        // Offer
        yourPrice: '',
        listPrice: '',
        itemCondition: '',
        maxOrderQuantity: '',
        fulfillment: '',

        // Keywords
        searchTerms: '',

        // Images
        images: [],

        // Description
        productDescription: '',
        keyProductFeatures: '',

        // Vital Info
        manufacturer: '',
        manufacturerPartNumber: '',
        isProductExpirable: '',
        numberOfItems: '',
        itemForm: '',
        unitCount: '',
        unitCountType: '',
        isHeatSensitive: '',

        // More Details
        fccId: '',
        rfId: '',
        carbEoNumber: '',
    });

    const handleInputChange = (name, value) => {
        setFormData((prev) => ({
            ...prev,
            [name] : value,
        }));
    };

    return { formData, handleInputChange };
};

export default useAmazonStep4Form;