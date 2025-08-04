
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
 * 해외 게시글 부분 수정
 * @param {number} postId - 수정할 게시글 ID
 * @param {Partial<{ userId: number; title: string; content: string; img: string; url: string; platform: string; yourPrice: string }>} updatedData
 */
export async function updateForeignPostById(postId, updatedData) {
    const response = await axiosInstance.patch(`/api/foreign-post/${postId}`, updatedData);
    return response.data;
}

/**
 * 해외 게시글 삭제
 * @param {number} postId - 삭제할 게시글 ID
 */
export async function deleteForeignPostById(postId) {
    const response = await axiosInstance.delete(`/api/foreign-post/${postId}`);
    return response.data;
}