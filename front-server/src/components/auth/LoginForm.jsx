import React, { } from 'react'
import logoImg from './../../assets/images/logo.png'
import { Link } from 'react-router-dom'
import styles from './LoginForm.module.css'
import SocialLoginButtons from './SocialLoginButtons';
import TextField from '../common/TextField';

const LoginForm = () => {

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className={styles.wrapper}>
            <img className={styles.logo} src={logoImg}/>
            <form className={styles.form} onSubmit={handleSubmit}>
                <TextField id="email" label="이메일" type="email" required singleFirst />
                <TextField id="password" label="비밀번호" type="password" required singleLast />
                <button type="submit">로그인</button>
                <Link to="/email_signup">이메일로 회원가입</Link>
            </form>
            <SocialLoginButtons title={"간편 로그인"}/>
        </div>
    )
}

export default LoginForm