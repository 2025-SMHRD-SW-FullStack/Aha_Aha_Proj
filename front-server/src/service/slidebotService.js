import axiosInstance from '../config/axiosInstance';

// 👉 슬라이드 초기화 요청
export const startSlides = async (userId) => {
  const response = await axiosInstance.post('/api/slidebot/start', null, {
    params: { userId },
  });
  return response.data;
};

// 👉 챗봇 메시지 전송 요청
export const sendChatMessage = async ({ userId, message }) => {
  const response = await axiosInstance.post('/api/slidebot/chat', {
    userId,
    message,
  });
  return response.data;
};

