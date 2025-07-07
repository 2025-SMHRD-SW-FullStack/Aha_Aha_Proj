import axiosFastAPI from '../config/axiosFastAPI';
// import axiosInstance from '../config/axiosInstance';

/**
 * 즐겨찾기 추가
 * @param {number} userId - 사용자 ID
 * @param {number} productItemId - 상품 아이템 ID
 */
export async function addFavorite(userId, productItemId) {
    try {
        const response = await axiosFastAPI.post('/favorite/add', {
            user_id: userId,
            product_item_id: productItemId
        });
        return response.data; // 성공 시 응답 데이터 반환
    } catch (error) {
        console.error('즐겨찾기 추가 실패:', error);
        throw error; // 에러 발생 시 예외 처리
    }
}

/**
 * 즐겨찾기 삭제
 * @param {number} userId - 사용자 ID
 * @param {number} productItemId - 상품 아이템 ID
 */
export async function removeFavorite(userId, productItemId) {
    try {
        const response = await axiosFastAPI.post('/favorite/remove', {
            user_id: userId,
            product_item_id: productItemId
        });
        return response.data; // 성공 시 응답 데이터 반환
    } catch (error) {
        console.error('즐겨찾기 삭제 실패:', error);
        throw error; // 에러 발생 시 예외 처리
    }
}

/**
 * product_item_name을 기반으로 product_item_id를 가져오는 함수
 * @param {string} productItemName - 상품 이름
 */
export async function getProductItemIdByName(productItemName) {
    try {
        const response = await axiosFastAPI.get('/products/getProductIdByName', {
            params: { name: productItemName }  // 상품 이름을 쿼리 파라미터로 전달
        });
        return response.data.productItemId; // 응답에서 productItemId 반환
    } catch (error) {
        console.error('상품 ID 조회 실패:', error);
        throw error; // 에러 발생 시 예외 처리
    }
}

/**
 * 특정 유저가 특정 상품을 즐겨찾기 했는지 확인하는 함수
 * @param {number} userId - 사용자 ID
 * @param {number} productItemId - 상품 아이템 ID
 */
export async function checkFavoriteStatus(userId, productItemId) {
    try {
        const response = await axiosFastAPI.get('/favorites/check', {
            params: { user_id: userId, product_item_id: productItemId }  // 유저 ID와 상품 ID를 쿼리 파라미터로 전달
        });
        return response.data.isFavorite;  // 응답에서 isFavorite 값을 반환
    } catch (error) {
        console.error('즐겨찾기 상태 확인 실패:', error);
        throw error;  // 에러 발생 시 예외 처리
    }
}
