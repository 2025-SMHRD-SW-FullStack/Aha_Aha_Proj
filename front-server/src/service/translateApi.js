import axiosFastAPI from '../config/axiosFastAPI';

/**
 * @description Amazon Step4 폼 데이터를 FastAPI 번역 엔드포인트로 전송하고,
 *              응답받은 번역된 필드를 원본 formData와 합쳐 반환합니다.
 * @param {Object} formData - Context에서 관리하는 모든 입력 필드 객체
 *   {
 *     variations,              // 'yes' | 'no'
 *     productId,               // string
 *     productIdType,           // 'gtin' | 'upc' | 'asin'
 *     noProductId,             // boolean
 *     productName,             // string
 *     brandName,               // string
 *     yourPrice,               // string
 *     listPrice,               // string
 *     itemCondition,           // 'new' | 'used'
 *     maxOrderQty,             // string
 *     fulfillment,             // 'fbm' | 'fba'
 *     searchTerms,             // string
 *     description,             // string
 *     keyFeatures,             // string
 *     manufacturer,            // string
 *     manufacturerPartNumber,  // string
 *     isExpirable,             // 'yes' | 'no'
 *     numberOfItems,           // string
 *     itemForm,                // string
 *     unitCount,               // string
 *     unitCountType,           // string
 *     heatSensitive            // 'yes' | 'no'
 *   }
 * @returns {Promise<Object>} merge된 전체 formData 객체
 */
const translateApi = async (formData) => {
    try {
        console.log('[translateApi] 요청 바디:', formData);
        const response = await axiosFastAPI.post(
        '/translate',
        formData,
        { headers: { 'Content-Type': 'application/json' } }
        );
        const translated = response.data || {};
        console.log('[translateApi] 응답 데이터:', translated);
        // API에서 번역된 일부 필드만 반환해도, 전체 keys 유지
        return { ...formData, ...translated };
    } catch (error) {
        console.error('[translateApi] 호출 오류:', error);
        throw error;
    }
};

export default translateApi;
