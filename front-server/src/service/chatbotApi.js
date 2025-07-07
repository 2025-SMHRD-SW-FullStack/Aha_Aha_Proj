import axiosFastAPI from '../config/axiosFastAPI';

/**
 * @param {{ userId: string, message: string }} payload
 */
export const sendChatToBot = async ({ userId, message }) => {
  const res = await axiosFastAPI.post('/chatbot', {
    userId,
    message,
  });
  return res.data;
};
