import axios from "axios";

const axiosFastAPI = axios.create({
    baseURL: import.meta.env.VITE_FASTAPI_BASE_URL,
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosFastAPI.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('FastAPI 오류: ', error);
        return Promise.reject(error.response?.data || error.message);
    }
);

export default axiosFastAPI;