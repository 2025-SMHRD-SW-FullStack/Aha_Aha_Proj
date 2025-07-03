import axios from "axios";

const axiosFastAPI = axios.create({
  baseURL: import.meta.env.VITE_FASTAPI_BASE_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 👉 accessToken 자동으로 헤더에 삽입
axiosFastAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

axiosFastAPI.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = "Bearer " + token;
            return axiosFastAPI(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      isRefreshing = true;

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/api/auth/reissue`,
          {}, // 보통 쿠키에 refreshToken 있음
          { withCredentials: true }
        );

        const newToken = response.data.accessToken;
        localStorage.setItem("accessToken", newToken);
        axiosFastAPI.defaults.headers.Authorization = `Bearer ${newToken}`;
        processQueue(null, newToken);

        return axiosFastAPI(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        localStorage.removeItem("accessToken");
        window.location.href = "/login"; // 또는 navigate("/login")
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(err.response?.data || err.message);
  }
);

export default axiosFastAPI;