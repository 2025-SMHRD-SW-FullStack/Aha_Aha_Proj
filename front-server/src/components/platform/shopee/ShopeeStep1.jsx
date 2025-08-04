import React, { useState } from 'react'
import styles from './Shopee.module.css'
import step1 from '/src/assets/images/shopee/step1.jpg'
import ImageModal from '../../chatbot/ImageModal';

const Step1 = () => {
    // 모달에 띄울 src 관리
    const [modalSrc, setModalSrc] = useState(null);

    return (
        <div>
            <h2>1단계: 셀러센터 로그인</h2>

            {/* 로그인 섹션 */}
            <div style={{marginBottom:'20px'}} className={styles.infoBoxStep1}>
                ① <strong>Shopee 한국 셀러센터(KRCS)</strong>에 로그인<br/>
                <div>
                    <a className={styles.linkHover}
                    href="https://seller.shopee.kr"
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                    🔗 Shopee 로그인 바로가기
                    </a>
                </div>
            </div>

            <div style={{backgroundColor:'#FFD7D7', border:0}} className={styles.infoBox}>
                <strong>⚠️ 꼭 main으로 끝나는 상점 메인 계정으로 로그인해야 상품 등록이 가능합니다.</strong>
                
            </div>
            <br/>
            <br />
            <h3>이미지 참고</h3>
            <div className={styles.imgBox}>
                <img
                    src={step1}
                    alt="셀러센터 로그인"
                    style={{ maxWidth: '100%', marginTop: '16px', borderRadius: '8px' }}
                    onClick={() => setModalSrc(step1)}
                />
            </div>

            {/* 하나의 ImageModal로 두 이미지를 모두 핸들링 */}
            <ImageModal
                src={modalSrc}
                onClose={() => setModalSrc(null)}
            />  
        </div>
    )
}

export default Step1