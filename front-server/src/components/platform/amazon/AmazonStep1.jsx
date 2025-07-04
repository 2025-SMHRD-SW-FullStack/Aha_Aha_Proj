import React from 'react'
import styles from './Amazon.module.css'
import step1 from '/src/assets/images/amazon/step1.png'

const AmazonStep1 = () => {
    return (
        <div>
            <h2>1단계: 셀러 센트럴 접속</h2>
            <div className={styles.infoBox}>
                · <strong>아마존 셀러 센트럴</strong>에 접속 후 로그인<br/>
                · 계정이 없다면 <strong>[Sign up]</strong> 버튼을 클릭하여 셀러 계정을 생성<br/>
                · 상단 메뉴에서 <strong>[Catalog]</strong> 클릭 후, <strong>[Add Products]</strong> 를 선택<br/><br/>
                <strong>💡TIP</strong> <br />
                <div className={styles.tipBox}>
                · 아마존 셀러 센트럴은 크롬 브라우저에서 가장 안정적으로 작동함
                </div>
            </div>
            <br/>

            <h3>🔗 관련 링크</h3>
            <div>
                <a className={styles.linkHover}
                href="https://sellercentral.amazon.com"
                target="_blank"
                rel="noopener noreferrer"
                >
                ① Amazon 셀러 센트럴 바로가기
                </a>
            </div>
            
            <br />
            <br />
            
            <h3>이미지 참고</h3>
            <div className={styles.imgBox}>
                <img
                    src={step1}
                    alt="셀러 센트럴 접속"
                    style={{ maxWidth: '100%', marginTop: '16px', borderRadius: '8px' }}
                />
            </div>    
        </div>
    )
}

export default AmazonStep1