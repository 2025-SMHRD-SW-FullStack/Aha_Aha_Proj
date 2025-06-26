import React from 'react'
import googleImg from './../../assets/images/google.png'
import kakaoImg from './../../assets/images/kakao.png'
import naverImg from './../../assets/images/naver.png'
import { Link } from 'react-router-dom'
import styles from '../auth/SocialLoginButtons.module.css'

const SocialLoginButtons = ({title = ""}) => {

    return (
        <div className={styles.wrapper}>
            <div className={styles.textWrapper}>
                <hr className={styles.line}></hr>
                <p>{title}</p>
                <hr className={styles.line}></hr>
            </div>
            <div className={styles.snsImgBox}>
                <Link><img src={googleImg} alt='구글 로그인'/></Link>
                <Link><img src={kakaoImg} alt='카카오 로그인'/></Link>
                <Link><img src={naverImg} alt='네이버 로그인'/></Link>
            </div>
        </div>
    )
}

export default SocialLoginButtons