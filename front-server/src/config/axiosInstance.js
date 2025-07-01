import axios from "axios";

/** [ 공통 요청 설정 파일 ]
 * 
 */
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL, // Spring 서버 주소
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// 요청 전에 토큰 자동 추가
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// 응답 에러 처리
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API 오류: ', error);
        return Promise.reject(error.response?.data || error.message);
    }
)

export default axiosInstance;