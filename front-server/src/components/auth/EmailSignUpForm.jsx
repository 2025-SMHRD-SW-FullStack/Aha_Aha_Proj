import React, { useEffect, useRef, useState } from 'react'
import TextField from '../common/TextField';
import styles from '../auth/EmailSignUpForm.module.css'
import logoImg from '../../assets/images/logo.png'
import lockIcon from '../../assets/images/lockIcon.png'
import checkIcon from '../../assets/images/checkIcon.png'

const EmailSignUpForm = () => {

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const [emailId,setEmailId] = useState('');
    const [emailDomain, setEmailDomain] = useState('');
    const [selectedDomain, setSelectedDomain] = useState('');
    const [email,setEmail] = useState('');

    const [gender, setGender] = useState('');
    
    const domainInputRef = useRef(null);

    /** [ 이메일 도메인 선택 ]
     * - 선택한 option의 value값을
     * - 이메일 도메인 창에 자동 채우기
     * - 직접 입력 시 비우기
     */
    const domainSelected = (e) => {
        const selected = e.target.value;
        setSelectedDomain(selected);
        setEmailDomain(selected);

        // 직접입력이면 공백으로 변경
        if (selected === '') setEmailDomain('');
    }

    /** [ 이메일 전체값 구성 ]
     * - 이메일 아이디와 도에민이 모두 있으면 email 합치기 */
    useEffect(() => {
        if(emailId && emailDomain) {
            const fullEmail = `${emailId}@${emailDomain}`;
            setEmail(fullEmail);
            console.log('이메일 전체 주소:', fullEmail);
        } else {
            setEmail('');
        }

    },[emailId, emailDomain])


    /** [ 직접 입력 시 입력창에 포커스 ] */
    useEffect(() => {
        if (selectedDomain === '') {
            domainInputRef.current?.focus();
        }
    },[selectedDomain])

    return (
        <div className={styles.wrapper}>
            <img className={styles.logo} src={logoImg} alt='로고이미지'/>
            <h3>회원 정보 입력</h3>    
            <p><span>* </span>필수 입력 사항</p>
            <form className={styles.form}>
                <TextField id="nickname" label="닉네임" type="text" required isRequiredMark single/>
                <div className={styles.emailBox}>
                    <TextField id="email" label="이메일" type="text" required isRequiredMark single value={emailId}onChange={(e) => setEmailId(e.target.value)}/>
                    <p>@</p>
                    <TextField id="email_domain" label="이메일 도메인" type="text" required isRequiredMark single value={emailDomain}onChange={(e) => setEmailDomain(e.target.value)}inputRef={domainInputRef}
                    />
                    <select className={styles.selectBox} value={selectedDomain} onChange={domainSelected}>
                        <option value="">직접 입력</option>
                        <option value="naver.com">naver.com</option>
                        <option value="google.com">google.com</option>
                        <option value="hanmail.net">hanmail.net</option>
                        <option value="nate.com">nate.com</option>
                        <option value="kakao.com">kakao.com</option>
                        <option value="msn.com">msn.com</option>
                    </select>
                </div>
                <button type="submit">인증 메일 발송</button>
                <TextField id="password" label="비밀번호" type="password" required isRequiredMark singleFirst icon={<img src={lockIcon} alt='비밀번호 아이콘'/>} />
                <TextField id="password_confirm" label="비밀번호 확인" type="password" required isRequiredMark singleLast icon={<img src={checkIcon} alt='비밀번호 아이콘'/>} />
                <TextField id="name" label="이름" type="text" required isRequiredMark singleFirst />
                <TextField id="birth" label="생년월일 8자리" type="text" required isRequiredMark singleMiddle/>
                <TextField id="gender" label="성별" type="radio" value={gender} onChange={(e) => setGender(e.target.value)} required isRequiredMark/>
            </form>
        </div>
    )
}

export default EmailSignUpForm