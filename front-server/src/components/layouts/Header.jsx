import React from 'react'
import logoImg from '../../assets/images/logo.png'
import styles from './Header.module.css'
import { Link, useLocation } from 'react-router-dom'

const Header = () => {
    // 메인 페이지에서는 네비바 숨김 처리
    const location = useLocation();
    const isMainPage = location.pathname === '/';
    const isLoginPage = location.pathname === '/login';
    const isSignUpPage = location.pathname === '/signup';

    return (
        <div>
            <header className={styles.wrapper}>
                <img className={styles.logo} src={logoImg} alt="로고이미지" />
                <div className={styles.authButtons}>
                    <Link to="/login">로그인</Link>
                    <Link to="/signup">회원가입</Link>
                </div>
            </header>

            {/* 메인 페이지 아니면 네비바 보여주기 */}
            {!isMainPage && !isLoginPage && !isSignUpPage &&(   
                <nav className={styles.nav}>
                    <Link>품목</Link>
                    <Link>중개 플랫폼</Link>
                    <Link>마이페이지</Link>
                </nav>
            )}
        </div>
    )
}
export default Header