import axiosFastAPI from '../config/axiosFastAPI';

/**
 * 🧠 Step1: 국가 추천
 */
export const step1Recommend = async ({ userId, item, page = 1, size = 3 }) => {
  const response = await axiosFastAPI.post('/api/step1', {
    userId,
    item,
    page,
    size,
  });
  return response.data;
};

/**
 * 🌍 Step2: 플랫폼 추천
 */
export const step2Recommend = async ({ userId, country }) => {
  const response = await axiosFastAPI.post('/api/step2', {
    userId,
    country,
  });
  return response.data;
};

/**
 * 📘 Step3: 플랫폼 가이드 (슬라이드 챗봇)
 */
export const step3Guide = async ({ userId, platform, message }) => {
  const response = await axiosFastAPI.post('/api/step3', {
    userId,
    platform,
    message,
  });
  return response.data;
};

/**
 * 🌐 Step4: 판매글 번역
 */
export const step4Translate = async ({ userId, title, content }) => {
  const response = await axiosFastAPI.post('/api/step4', {
    userId,
    title,
    content,
  });
  return response.data;
};
