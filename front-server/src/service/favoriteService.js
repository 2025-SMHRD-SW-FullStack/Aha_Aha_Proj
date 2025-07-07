import axiosInstance from "../config/axiosInstance";

/** 품목명으로 productItemId 조회 */
// export async function getProductItemIdByName(name) {
//     const res = await axiosInstance.get("/api/product/item-id", {
//         params: { name }
//     });
//     return res.data; // id 반환  
// }

/** 즐겨찾기 토글 */
export async function toggleFavorite(productItemId) {
    const response = await axiosInstance.post("/api/favorites/toggle", {
        productItemId
    });  
    return response.data;
}

/** 즐겨찾기 목록 조회 */
export async function getFavoriteList() {
    const response = await axiosInstance.get('/api/favorites');
    return response.data;
}