import axiosFastAPI from '../config/axiosFastAPI';

/**
 * @param {{ userId: string, platform: string, message: string }} payload
 */
export const sendChatToBot = async ({ userId, platform, message }) => {
  const res = await axiosFastAPI.post('/chatbot', {
    userId,
    platform,
    message,
  });
  return res.data;
};
