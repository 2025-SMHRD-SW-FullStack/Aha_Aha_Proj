import axios from '../config/axiosInstance';

export const step5PostTranslation = async ({ userId, title, content, translatedTitle, translatedContent, target }) => {
  const response = await axios.post('/api/step5/post', {
    userId,
    title,
    content,
    translatedTitle,
    translatedContent,
    target, // 'domestic' | 'foreign' | 'both'
  });
  return response.data;
};
