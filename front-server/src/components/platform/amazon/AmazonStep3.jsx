import React from 'react'
import styles from './Amazon.module.css'
import step3_1 from '/src/assets/images/amazon/step3_1.png'
import step3_2 from '/src/assets/images/amazon/step3_2.png'

const AmazonStep3 = () => {
    return (
        <div>
            <h2>3단계: 카테고리 선택</h2>
            <br />
            <h3>✅ 새 상품 등록하러 가기</h3>
            <p className={styles.infoBox}>
                · 카테고리<strong>[Category]</strong>를 선택 <br />
                · 예시: 패션, 전자제품, 문구 등 <br/><br/>
                <strong>카테고리 선택 방법</strong> <br />
                <div className={styles.tipBox}>
                <strong>검색 [Search]</strong>: 상품명을 입력하여 유사한 카테고리를 찾기 <br />
                <strong>수동 선택 [Browse]</strong>: 단계별로 클릭해 적합한 카테고리를 수동 선택
                </div>
                
            </p>
            <br />

            <h3>이미지 참고</h3>
            <div className={styles.imgBox}>
                <img
                    src={step3_1}
                    alt="새 상품 등록"
                    style={{ maxWidth: '100%', marginTop: '16px', borderRadius: '8px' }}
                    />
            </div> 
            <br />
            
            <h3>✅ 기존 상품 등록하러 가기</h3>
            <p className={styles.infoBox}>
                · <strong>[Sell this product]</strong> 클릭하여 판매 정보 등록 <br />
                · <strong>[Show limitations]</strong> 클릭하여 조건 확인 후 <strong>[Apply to sell]</strong> 선택
            </p>
            <br />

            
            <h3>이미지 참고</h3>
            <div className={styles.imgBox}>
                <img
                    src={step3_2}
                    alt="기존 상품 등록"
                    style={{ maxWidth: '100%', marginTop: '16px', borderRadius: '8px' }}
                />
            </div> 
        </div>
    )
}

export default AmazonStep3