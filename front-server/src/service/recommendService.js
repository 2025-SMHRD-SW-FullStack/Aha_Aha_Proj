import axiosFastAPI from "../config/axiosFastAPI";

/** 품목별 수출 유망 국가 추천 */
export async function getRecommendedCountries(itemName) {
    try {
        const res = await axiosFastAPI.get('/api/recommend/', {
            params: {
                item: itemName,
                page: 1,
                size: 20
            }
        });
        return res.data;
    } catch (err) {
        if (err.response && err.response.status === 404) {
            return { tableData: [], message: err.response.data.detail };
        }
        throw err;
    }
}

/** 국가별 추천 플랫폼 가져오기 */
export async function getRecommendedPlatformByCountry(country) {
    const res = await axiosFastAPI.get('/api/platform/platforms/recommend', {
        params: { country }
    });
    return res.data.recommendedPlatforms || [];
}
