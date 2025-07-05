import axiosInstance from "../config/axiosInstance";

/** 품목명으로 productItemId 조회 */
export async function getProductItemIdByName(name) {
    const res = await axiosInstance.get("/api/product/item-id", {
        params: { name }
    });
    return res.data; // id 반환  
}

/** 즐겨찾기 토글 */
export async function toggleFavorite(productItemId) {
    await axiosInstance.post("/api/favorites/toggle", {
        productItemId
    });  
}