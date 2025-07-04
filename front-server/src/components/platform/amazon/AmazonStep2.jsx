import React from 'react'
import styles from './Amazon.module.css'
import step2_1 from '/src/assets/images/amazon/step2_1.png'
import step2_2 from '/src/assets/images/amazon/step2_2.png'

const AmazonStep2 = () => {
    return (
        <div>
            <h2>2단계 : 상품 검색 또는 신규 등록</h2>
            <br />
            <h3>✅ 새 상품 등록하러 가기</h3>
            <div className={styles.infoBox}>
                · 아마존 검색창 하단의 <strong>[I’m adding a product not sold on Amazon]</strong> 버튼 
                또는 카탈로그 검색 결과창 좌측 하단의 <strong>[Create a new listing]</strong> 버튼을 
                클릭하여 새 상품 등록을 시작
            </div>
            <br />

            <h3>이미지 참고</h3>
            <div className={styles.imgBox}>
                <img
                    src={step2_1}
                    alt="새 상품 등록"
                    style={{ maxWidth: '100%', marginTop: '16px', borderRadius: '8px' }}
                    />
            </div> 
            <br />
            
            <h3>✅ 기존 상품 등록하러 가기</h3>
            <div className={styles.infoBox}>
                · 이미 아마존에 등록된 상품인지 확인하기 위해 검색창에 <strong>제품명, UPC, EAN, ISBN</strong> 등을 입력 <br />
                · 동일한 상품이 있을 경우, <strong>[Sell this product]</strong> 버튼을 눌러 등록
                <p style={{ color: 'red' }}>⚠️ 중복 등록은 계정에 불이익이 있을 수 있으므로 주의</p>
            </div>
            <br />

            
            <h3>이미지 참고</h3>
            <div className={styles.imgBox}>
                <img
                    src={step2_2}
                    alt="기존 상품 등록"
                    style={{ maxWidth: '100%', marginTop: '16px', borderRadius: '8px' }}
                />
            </div> 
        </div>
    )
}

export default AmazonStep2