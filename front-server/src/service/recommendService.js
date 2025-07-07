import axiosFastAPI from "../config/axiosFastAPI";

/** 국가별 추천 플랫폼 가져오기 */
// export async function getRecommendedPlatformByCountry(country) {
//     const res = await axiosFastAPI.get('/api/platform/platforms/recommend', {
//         params: { country }
//     });
//     return res.data.recommendedPlatforms || [];
// }

export async function getRecommendedCountries(itemName) {
    const res = await axiosFastAPI.get('/recommend', {
        params: { item: itemName, page: 1, size: 20}
    });

    return res.data;
}