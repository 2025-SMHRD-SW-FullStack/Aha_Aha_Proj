import React, { useEffect, useRef, useState } from 'react'
import TextField from '../common/TextField';
import styles from '../auth/EmailSignUpForm.module.css'
import logoImg from '/src/assets/images/logo.png'
import lockIcon from '/src/assets/images/lockIcon.png'
import checkIcon from '/src/assets/images/checkIcon.png'
import errorIcon from '/src/assets/images/error.png'
import searchIcon from '/src/assets/images/search2.png'
import successIcon from '/src/assets/images/success.png'
import { loginRequest, sendEmailVerification, signupRequest } from '/src/service/authService'
import { useSignUpForm } from '/src/hooks/useSignupForm';
import { useNavigate } from 'react-router-dom';
import useGoHome from '/src/hooks/useGoHome';
import { useDaumPostcodePopup } from 'react-daum-postcode';

const EmailSignUpForm = () => {

    const navigate = useNavigate();
    const goHome = useGoHome();

    const  { 
        nickname, setNickname, 
        email, setEmail, 
        emailVerified, setEmailVerified, 
        password, setPassword ,
        confirmPassword, setConfirmPassword,
        name, setName,
        birth, setBirth,
        gender, setGender,
        phone, setPhone,
         // ✅ 회사 정보 추가
        companyName, setCompanyName,
        businessNumber, setBusinessNumber,
        address, setAddress,
        ceoName, setCeoName,
        industry, setIndustry,
        product, setProduct,
        isValid,
        nicknameError, setNicknameError,
        emailError, setEmailError,
        passwordError, setPasswordError,
        passwordConfirmError, setPasswordConfirmError
    } = useSignUpForm();

    /** [ 회원가입 완료 시 DB 저장 및 자동 로그인 처리 ] */
    const handleSubmit = async (e) => {
        e.preventDefault();

        // 본사 주소 + 상세 주소 합치기
        const fullAddress = `${address}${addressDetail ? ' ' + addressDetail : ''}`

        try {
            // 회원가입 요청
            const response = await signupRequest({
                nickname,
                email,
                password,
                confirmPassword,
                name,
                birth,
                gender,
                phone,
                companyName,     // ✅ 추가
                businessNumber,
                address: fullAddress,
                ceoName,
                industry,
            });

            // 바로 로그인 요청
            const { token, user } = await loginRequest({email, password});

            // AccessToken 저장
            localStorage.setItem('accessToken', token);

            // 메인 페이지 이동
            navigate('/');

            alert('회원가입이 완료되었습니다!');
            console.log('회원가입 결과: ', response);

        } catch (error) {
            console.error('회원가입 실패: ', error);
            alert('회원가입에 실패했습니다. 다시 시도해주세요.');
        }
    }

    // 주소 팝업 state
    // ① 훅 호출 (scriptUrl은 생략해도 됩니다)
    const open = useDaumPostcodePopup();

    // ② 주소 선택 완료 핸들러
    const handleComplete = (data) => {
        let fullAddress = data.address;
        let extra = '';
        if (data.addressType === 'R') {
        if (data.bname) extra += data.bname;
        if (data.buildingName) {
            extra += extra ? `, ${data.buildingName}` : data.buildingName;
        }
        fullAddress += extra ? ` (${extra})` : '';
        }
        setAddress(fullAddress);
    };

    // ③ 팝업 실행 함수
    const handleOpenPostcode = () => {
        const width = 500;
        const height = 450;
        // 화면 전체 크기에서 팝업 크기를 뺀 후 절반을 줘서 중앙 정렬
        const left = (window.screen.width  - width ) / 2.1;
        const top  = (window.screen.height - height) / 2.8;
    
    open({
        onComplete: handleComplete,
        autoClose: true,   // 선택 후 자동 닫기
        width,             // 팝업 너비
        height,            // 팝업 높이
        left,              // 팝업 X 위치 :contentReference[oaicite:0]{index=0}
        top,               // 팝업 Y 위치 :contentReference[oaicite:1]{index=1}
    });
    };

    // 본사 주소 state
    const [addressDetail, setAddressDetail] = useState('');

    // 이메일 도메인용 state
    const [emailId,setEmailId] = useState('');
    const [emailDomain, setEmailDomain] = useState('');
    const [selectedDomain, setSelectedDomain] = useState('');

    // 휴대폰 번호 분리 입력
    const [phonePrefix, setPhonePrefix] = useState('010');
    const [phoneMiddle, setPhoneMiddle] = useState('');
    const [phoneLast, setPhoneLast] = useState('');

    // 휴대폰 번호 phone으로 동기화
    useEffect(() => {
        setPhone(`${phonePrefix}-${phoneMiddle}-${phoneLast}`)
    },[phonePrefix, phoneMiddle, phoneLast]);

    // 사업자등록번호 분리 입력
    const [bizPrefix, setBizPrefix] = useState('');
    const [bizMiddle, setBizMiddle] = useState('');
    const [bizLast, setBizLast] = useState('');

    // 사업자등록번호 businessNumber로 동기화
    useEffect(() => {
        setBusinessNumber(`${bizPrefix}-${bizMiddle}-${bizLast}`)
    }, [bizPrefix, bizMiddle, bizLast]);

    // 이메일 인증 확인 메세지
    const [verificationMessage, setVerificationMessage] = useState('');
    const [verificationStatus, setVerificationStatus] = useState('');
    
    const nicknameInputRef = useRef(null);
    const domainInputRef = useRef(null);


    // 처음 로딩 시 닉네임창으로 포커스
    useEffect(()=> {
        nicknameInputRef.current?.focus();
    },[])


    // 이메일 도메인 선택 선택한 option의 value값을 
    // 이메일 도메인 창에 자동 채우기 -> 직접 입력 시 비우기
    const domainSelected = (e) => {
        const selected = e.target.value;
        setSelectedDomain(selected);
        setEmailDomain(selected);

        // 직접입력 선택 시에만 포커스
        if (selected === '') {
            domainInputRef.current?.focus();
        }
    }

    // 이메일 아이디와 도메민이 모두 있으면 email 합치기
    // 이메일 주소가 변경되면 인증 상태 초기화
    useEffect(() => {
        if(emailId && emailDomain) {
            const fullEmail = `${emailId}@${emailDomain}`;
            setEmail(fullEmail);
            console.log('이메일 전체 주소:', fullEmail);

            // 인증 상태 초기화
            setEmailVerified(false);
            setVerificationMessage('');
            setVerificationStatus('');
            setEmailError('');
        } else {
            setEmail('');
        }

    },[emailId, emailDomain])

    // 이메일 인증 완료 시 메시지 수신
    useEffect(() => {
        const interval = setInterval(() => {
            const verified = localStorage.getItem('emailVerified');
            if (verified === 'true') {
                setEmailVerified(true);
                setVerificationMessage('이메일 인증이 완료되었습니다.');
                setVerificationStatus('success');
                localStorage.removeItem('emailVerified'); // 1회만 작동
            }
        }, 1000); // 1초마다 확인
    
        return () => clearInterval(interval);
    }, []);

    /** [ 인증 메일 발송 ] 
     * - 이메일 다 입력된 상태에서 버튼 클릭 시
     * - 해당 이메일로 이메일 인증 메일 발송됨
    */
    const handleSendVerification = async (e) => {
        e.preventDefault();

        if (!email) {
            setEmailError('이메일을 정확히 입력해주세요.');
            return;
        }

        try {
            const result = await sendEmailVerification(email);
            alert('인증 메일이 발송되었습니다. 이메일을 확인해주세요!');
            console.log(result); // 서버에서 받은 응답 확인용
            setEmailError('');
        } catch (err) {
            console.error('이메일 전송 실패: ', err);
            setEmailError('이메일 전송에 실패했습니다. 다시 시도해주세요.');
        }
    };

    const validatePassword = (value) => {
        if (!value) {
            setPasswordError('');
            return;
        }

        const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;
        if (!regex.test(value)) {
            setPasswordError('8~16자의 영문 대/소문자, 숫자, 특수문자를 사용해 주세요.');
        } else {
            setPasswordError('');
        }
    };

    const validatePasswordConfirm = (value) => {
        if (!value) {
            setPasswordConfirmError('');
            return;
        }

        if (value !== password) {
            setPasswordConfirmError('비밀번호가 같지 않습니다. 다시 입력해주세요.');
        } else {
            setPasswordConfirmError('');
        }
    }


    return (
        <div className={styles.wrapper}>
            <img className={styles.logo} src={logoImg} alt='로고이미지' onClick={goHome}/>

            <form className={styles.form} onSubmit={handleSubmit}>
                {/* 회원 정보 탭 */}
                <h3>회원 정보 입력</h3>    
                <p className={styles.inputInfoText}><span>* </span>필수 입력 사항</p>

                {/* 닉네임 */}
                <TextField id="nickname" label="닉네임" type="text" required isRequiredMark single inputRef={nicknameInputRef}
                            value={nickname} onChange={(e) => {
                                setNickname(e.target.value);
                                setNicknameError('');
                            }}/>
                {nicknameError && (
                    <span className={`${styles.errorText} ${styles.error}`}>
                    <img
                        src={errorIcon}
                        alt="에러 아이콘"
                        style={{height:'20px', marginRight:'5px'}}
                    />
                    {nicknameError}
                </span>
                )}
                {/* 이메일 */}
                <div className={styles.emailBox}>
                    <TextField id="email" label="이메일" type="text" required isRequiredMark single value={emailId}onChange={(e) => setEmailId(e.target.value)}/>
                    <p>@</p>
                    <TextField id="email_domain" label="이메일 도메인" type="text" required isRequiredMark single value={emailDomain}onChange={(e) => setEmailDomain(e.target.value)}inputRef={domainInputRef}
                    />
                    <select className={styles.selectBox} value={selectedDomain} onChange={domainSelected}>
                        <option value="">직접 입력</option>
                        <option value="naver.com">naver.com</option>
                        <option value="gmail.com">gmail.com</option>
                        <option value="hanmail.net">hanmail.net</option>
                        <option value="nate.com">nate.com</option>
                        <option value="kakao.com">kakao.com</option>
                        <option value="msn.com">msn.com</option>
                    </select>
                </div>
                {emailError && (
                    <span className={`${styles.errorText} ${styles.error}`}>
                    <img
                        src={errorIcon}
                        alt="에러 아이콘"
                        style={{height:'20px', marginRight:'5px'}}
                    />
                    {emailError}
                </span>
                )}

                    {/* 인증 버튼 or 인증 완료 메시지 */}
                    {!emailVerified ? (
                        <button className={styles.mailBtn} type="button" onClick={handleSendVerification}>인증 메일 발송</button>
                    ) : (
                        <span className={`${styles.verifyMessage} ${styles[verificationStatus]}`}>
                        <img
                            src={verificationStatus === 'success' ? successIcon : errorIcon}
                            alt="인증 상태 아이콘"
                            style={{height:'20px', marginRight:'5px'}}
                        />
                        {verificationMessage}
                    </span>
                    )}

                {/* 비밀번호 */}
                <div className={styles.passwordBox}>
                    <TextField id="password" label="비밀번호" type="password" required isRequiredMark singleFirst 
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    validatePassword(e.target.value);
                                }}
                                icon={<img src={lockIcon} alt='비밀번호 아이콘'/>} />
                    <TextField id="password_confirm" label="비밀번호 확인" type="password" required isRequiredMark singleLast 
                                value={confirmPassword}
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value);
                                    validatePasswordConfirm(e.target.value);
                                }}
                                icon={<img src={checkIcon} alt='비밀번호 아이콘'/>} />
                    
                    {passwordError && (
                        <span className={`${styles.errorText} ${styles.error}`}>
                        <img
                            src={errorIcon}
                            alt="에러 아이콘"
                            style={{height:'20px', marginRight:'5px'}}
                        />
                        {passwordError}
                        </span>
                    )}
                    {passwordConfirmError && (
                        <span className={`${styles.errorText} ${styles.error}`}>
                        <img
                            src={errorIcon}
                            alt="에러 아이콘"
                            style={{height:'20px', marginRight:'5px'}}
                        />
                        {passwordConfirmError}
                        </span>
                    )}
                </div>
                
                {/* 기타 필수 입력*/}
                <div className={styles.restBox}>
                    <TextField id="user_name" label="이름" type="text" required isRequiredMark singleFirst 
                                value={name} onChange={(e) => setName(e.target.value)}/>
                    <TextField id="birth" label="생년월일 6자리" type="text" required isRequiredMark singleMiddle2
                                value={birth} onChange={(e) => setBirth(e.target.value)}/>
                    <TextField id="gender" label="성별" type="radio" 
                                value={gender} onChange={(e) => setGender(e.target.value)} required isRequiredMark/>
                </div>

                {/* 휴대전화번호 */}
                <div className={styles.phoneBox}>
                    <select className={styles.selectPhoneBox} value={phonePrefix} onChange={(e) => setPhonePrefix(e.target.value)}>
                        <option value="010">010</option>
                        <option value="011">011</option>
                    </select>
                    <p>-</p>
                    <TextField id="phoneMiddle" label="휴대전화 중간" type="text" required isRequiredMark single
                                    value={phoneMiddle} onChange={(e) => setPhoneMiddle(e.target.value)} maxLength={4}/>
                    <p>-</p>
                    <TextField id="phoneLast" label="휴대전화 끝" type="text" required isRequiredMark single
                                    value={phoneLast} onChange={(e) => setPhoneLast(e.target.value)} maxLength={4}/>
                </div>
                {/* 회사 정보 탭 */}
                <h3>회사 정보 입력</h3>    
                <p className={styles.inputInfoText}>선택 입력 사항</p>
            
                <div>
                    <TextField id="ceo_name" label="대표자명" type="text" singleFirst
                        value={ceoName} onChange={(e) => setCeoName(e.target.value)}/>
                    <TextField id="company_name" label="회사명" type="text" singleMiddle
                        value={companyName} onChange={(e) => setCompanyName(e.target.value)}/>
                    <TextField id="industry" label="업종" type="text" singleLast
                        value={industry} onChange={(e) => setIndustry(e.target.value)}/>
                    <br />

                    {/* 사업자등록번호 */}
                    <p style={{color:'var(--color-gray70)'}}>사업자등록번호</p>
                    <div className={styles.bizBox}>
                        <TextField id="bizPrefix" label="3자리" type="text" single
                            value={bizPrefix} onChange={(e) => setBizPrefix(e.target.value)} maxLength={3}/>
                        <p>-</p>
                        <TextField id="bizMiddle" label="2자리" type="text" single
                            value={bizMiddle} onChange={(e) => setBizMiddle(e.target.value)} maxLength={2}/>
                        <p>-</p>
                        <TextField id="bizLast" label="5자리" type="text" single
                            value={bizLast} onChange={(e) => setBizLast(e.target.value)} maxLength={5}/>
                    </div>
                    <br />

                    {/* 본사 주소 */}
                    <TextField id="address" label="본사 주소" type="text" singleFirst
                        value={address}
                        onClick={handleOpenPostcode }
                        onChange={(e) => {setAddress(e.target.value); }}
                        icon={<img src={searchIcon} alt='주소 검색 아이콘'/>} />
                    <TextField id="addressDetail" label="상세 주소" type="text" singleLast
                        value={addressDetail} 
                        onChange={(e) => {setAddressDetail(e.target.value); }}
                        />
                </div>
                
                {/* 유효성 조건에 따라 활성/비활성화 처리 */}
                <button className={styles.submitBtn} type='submit' disabled={!isValid}>회원가입</button>
            </form>
        </div>
    )
}

export default EmailSignUpForm