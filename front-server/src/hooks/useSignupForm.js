import { useState } from "react";

/** [ 회원가입 상태관리 ]
 * - 닉네임, 이메일, 이메일 인증, 비밀번호, 비밀번호 확인, 이름, 생년월일, 성별, 번호
 * - 비밀번호 = 비밀번호 확인 / 생년월일 8자리
 */
export function useSignUpForm() {
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [emailVerified, setEmailVerified] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [name, setName] = useState('');
    const [birth, setBirth] = useState('');
    const [gender, setGender] = useState('');
    const [phone, setPhone] = useState('');

    const isValid =
    email && password && passwordConfirm && 
    password === passwordConfirm &&
    name && nickname && birth.length === 8 && 
    gender && phone && emailVerified;

    return {
        nickname, setNickname,
        email, setEmail,
        emailVerified, setEmailVerified,
        password, setPassword,
        passwordConfirm, setPasswordConfirm,
        name, setName,
        birth, setBirth,
        gender, setGender,
        phone, setPhone,
        isValid,
    };
}