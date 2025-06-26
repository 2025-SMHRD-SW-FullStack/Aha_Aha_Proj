import axios from "axios";

/** 로그인 요청 */
export async function loginRequest({ email, password }) {
    const res = await axios.post('/api/auth/login', { email, password });
    return res.data;
}

/** 회원가입 요청 */
export async function signupRequest({
    nickname, email, password, name, birth, gender, phone
}) {
    const res = await axios.post('/api/auth/signup', {
        nickname, email, password, name, birth, gender, phone
    });
    return res.data;
}

/** 로그아웃 요청 */
export async function logoutRequest() {
    const res = await axios.post('/api/auth/logout');
    return res.data;
}

/** AccessToken 재발급 */
export async function refreshAccessToken() {
    const res = await axios.post('/api/auth/refresh');
    return res.data;
}

/** 이메일 인증 링크 전송(요청) */
export async function sendEmailVerification(email) {
    const res = await axios.post('/api/email/send', {email});
    return res.data;
}

/** 이메일 인증 확인 */
export async function verifyEmail({email, code}) {
    const res = await axios.get('/api/email/verify', {
        params: {email, code}
    });
    return res.data;
}