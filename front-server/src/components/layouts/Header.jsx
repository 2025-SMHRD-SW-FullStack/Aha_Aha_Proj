import React from 'react'
import logoImg from '../../assets/images/logo.png'
import styles from './Header.module.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import useGoHome from '../../hooks/useGoHome'

const Header = () => {
    const navigate = useNavigate();

    // 메인 페이지에서는 네비바 숨김 처리
    const location = useLocation();
    const isMainPage = location.pathname === '/';
    const isLoginPage = location.pathname === '/login';
    const isSignUpPage = location.pathname === '/signup';

    // 로그인 상태 확인
    const isLoggedIn = !!localStorage.getItem('accessToken');

    /** 로그아웃 처리 함수 */
    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        alert('로그아웃 되었습니다.');
        navigate('/');
    }

    return (
        <div>
            <header className={styles.wrapper}>
                <img className={styles.logo} src={logoImg} alt="로고이미지" onClick={useGoHome()} />
                <div className={styles.authButtons}>
                    {/* 로그인 상태에 따라 버튼 조건부 렌더링 */}
                    {isLoggedIn ? (
                        <>
                            <Link to="/mypage">마이페이지</Link>
                            <button onClick={handleLogout} className={styles.logoutBtn}>로그아웃</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login">로그인</Link>
                            <Link to="/signup">회원가입</Link>
                        </>
                    )}
                    
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