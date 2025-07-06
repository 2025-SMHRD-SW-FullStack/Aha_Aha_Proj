import axiosFastAPI from "../config/axiosFastAPI";

/** 품목별 수출 유망 국가 추천 */
export async function getRecommendedCountries(itemName, page = 1, size = 20) {
    try {
      const res = await axiosFastAPI.get('/recommend', {  // ① 슬래시 제거
        params: { 
        item: itemName,
        page,
        size
        }
    });
    // 200: 문자열 응답
    return res.data;  
} catch (err) {
    if (err.response) {
    // 422: validation error
    if (err.response.status === 422 && Array.isArray(err.response.data.detail)) {
        return { errors: err.response.data.detail };
    }
    // 기타 4xx/5xx
    return { error: err.response.data.detail || err.message };
    }
    // 네트워크 오류 등
    throw err;
}
}

/** 국가별 추천 플랫폼 가져오기 */
// export async function getRecommendedPlatformByCountry(country) {
//     const res = await axiosFastAPI.get('/api/platform/platforms/recommend', {
//         params: { country }
//     });
//     return res.data.recommendedPlatforms || [];
// }