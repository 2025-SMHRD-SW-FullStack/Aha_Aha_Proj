import React from 'react'
import styles from './Shopee.module.css'
import step1 from '/src/assets/images/shopee/step1.jpg'

const Step1 = () => {
    return (
        <div>
            <h2>1단계: 셀러센터 로그인</h2>
            <div className={styles.infoBox}>
                · <strong>Shopee 한국 셀러센터(KRCS)</strong>에 로그인합니다. <br/>
                <p>(예시: "xxxx:main" 형식으로 입력)</p>
                <p style={{ color: 'red' }}>⚠️ 꼭 main으로 끝나는 상점 메인 계정으로 로그인해야 상품 등록이 가능합니다.</p>
            </div>
            <br/>

            <h3>🔗 관련 링크</h3>
            <div>
                <a className={styles.linkHover}
                href="https://seller.shopee.kr"
                target="_blank"
                rel="noopener noreferrer"
                >
                ① Shopee 셀러센터 바로가기
                </a>
            </div>
            <div>
                <a className={styles.linkHover}
                href="https://seller.shopee.kr"
                target="_blank"
                rel="noopener noreferrer"
                >
                ② Shopee 회원가입 바로가기
                </a>
            </div>
            <br/>

            <br />
            <h3>이미지 참고</h3>
            <div className={styles.imgBox}>
                <img
                    src={step1}
                    alt="셀러센터 로그인"
                    style={{ maxWidth: '100%', marginTop: '16px', borderRadius: '8px' }}
                />
            </div>    
        </div>
    )
}

export default Step1