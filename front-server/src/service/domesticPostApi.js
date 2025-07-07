import axiosInstance  from '/src/config/axiosInstance';

/**
 * 국내 게시글 전체 조회
 */
export async function getAllDomesticPosts() {
const response = await axiosInstance.get('/api/domestic-post');
return response.data;
}

/**
 * 국내 게시글 등록
 * @param {{ userId: number; title: string; content: string; img: string; url: string; platform: string; yourPrice: string }} postData
 */
export async function createDomesticPost(postData) {
const response = await axiosInstance.post('/api/domestic-post', postData);
return response.data;
}

/**
 * 국내 게시글 상세 조회
 * @param {number} postId
 */
export async function getDomesticPostById(postId) {
const response = await axiosInstance.get(`/api/domestic-post/${postId}`);
return response.data;
}

/**
 * 내 국내 게시글 목록 조회
 * @param {number} userId
 */
export async function getMyDomesticPosts(userId) {
const response = await axiosInstance.get('/api/domestic-post/my', {
    params: { userId },
});
return response.data;
}
