// src/config/axiosFastAPI.js
import axios from "axios";

const axiosFastAPI = axios.create({
  baseURL: import.meta.env.VITE_FASTAPI_BASE_URL, // ⚠️ FastAPI 서버 주소 (예: http://localhost:8000)
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosFastAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosFastAPI.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error("⚠️ FastAPI 오류:", err);
    return Promise.reject(err.response?.data || err.message);
  }
);

export default axiosFastAPI;
