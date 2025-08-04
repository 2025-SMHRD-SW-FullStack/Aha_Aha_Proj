
import { axiosInstance } from '/src/config/axiosInstance';
/**
 * 해외 게시글 전체 조회
 */
export async function getAllForeignPosts() {
    const response = await axiosInstance.get('/api/foreign-post');
    return response.data;
}

/**
 * 해외 게시글 등록
 * @param {{ userId: number; title: string; content: string; img: string; url: string; platform: string; yourPrice: string }} postData
 */
export async function createForeignPost(postData) {
    const response = await axiosInstance.post('/api/foreign-post', postData);
    return response.data;
}

/**
 * 해외 게시글 상세 조회
 * @param {number} postId
 */
export async function getForeignPostById(postId) {
    const response = await axiosInstance.get(`/api/foreign-post/${postId}`);
    return response.data;
}

/**
 * 내 해외 게시글 조회
 * @param {number} userId
 */
export async function getMyForeignPosts(userId) {
    const response = await axiosInstance.get('/api/foreign-post/my', {
    params: { userId },
    });
    return response.data;
}

/**
 * 🆕 해외 게시글 URL 업데이트
 * @param {number} postId
 * @param {{ url: string }} payload
 */
export async function updateForeignPostById(postId, payload) {
    const response = await axiosInstance.put(
    `/api/foreign-post/${postId}`,
    payload
);
return response.data;
}