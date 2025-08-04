import React, { useContext, useState } from 'react'
import styles from './Shopee.module.css'
import step5 from '/src/assets/images/shopee/step5.png'
import ShopeeContext from '/src/provider/ShopeeFormContext.jsx'
import CopyButton from '../../common/CopyButton'
import ImageModal from '../../chatbot/ImageModal'


const ShopeeStep5 = () => {
    // 모달에 띄울 src 관리
    const [modalSrc, setModalSrc] = useState(null);

    const { formData, updateField } = useContext(ShopeeContext);

    return (
        <div>
            <div className={styles.stickyHeader}>  
                <div className={styles.selectInputBox}>
                    <div className={styles.inputOnOffBox}>     
                        <div className={styles.inputOff}></div>
                        <span>입력 전 상태</span>
                        <div className={styles.inputOn}></div>
                        <span>입력 후 상태</span>
                    </div>
                </div>
                <br/>
            </div>

            <h2>5단계: 무게 및 배송 정보 입력</h2>
            <div className={styles.infoBox}>
                · 이 단계에서는 <strong>상품의 배송무게 및 부피</strong>를 설정합니다.
            </div>
            <br/>

            <h3>⚙️ Shipping</h3>
            <h4>무게, 부피, 사용 가능한 배송 옵션 토글</h4><br />

            <div className={styles.userInputBox}>
                <label className={styles.customLabel}>Weight</label>
                <label style={{fontWeight:'normal'}} className={styles.customLabel}>
                    <input className={styles.customInput}
                        type="text" 
                        placeholder="ex) 0.5kg"
                        value={formData.Weight || ''} 
                        onChange={(e) => updateField('Weight', e.target.value)}
                        />  
                </label>
                {/* 복사 버튼 (입력값 복사) */}
                <div style={{
                    position: 'absolute',
                    right: '8px',
                    top: '60%',
                    transform: 'translateY(-50%)'
                    }}>
                    <CopyButton text={formData.Weight} />
                </div>
            </div>

            <div className={styles.userInputBox}>
                <label className={styles.customLabel}>Parcel Size (cm)</label>
                <div className={styles.parcelSizeBox}>
                    <input
                    type="text"
                    className={styles.parcelInput}
                    placeholder="W"
                    value={formData.ParcelWidth || ''}
                    onChange={(e) => updateField('ParcelWidth', e.target.value)}
                    />
                    <span className={styles.multiplySign}>×</span>
                    <input
                    type="text"
                    className={styles.parcelInput}
                    placeholder="L"
                    value={formData.ParcelLength || ''}
                    onChange={(e) => updateField('ParcelLength', e.target.value)}
                    />
                    <span className={styles.multiplySign}>×</span>
                    <input
                    type="text"
                    className={styles.parcelInput}
                    placeholder="H"
                    value={formData.ParcelHeight || ''}
                    onChange={(e) => updateField('ParcelHeight', e.target.value)}
                    />
                    <span className={styles.unit}>cm</span>
                </div>
            </div>
            <div className={styles.infoBox}>
                <strong>Weight</strong> <br />
                · 포장 완료된 상태의 실제 무게(kg)를 입력 <br />
                <strong>Parcel Size</strong> <br />
                · 가로 x 세로 x 높이(cm) 순서로 입력 <br />
                · 입력 후, Shopee에서 자동으로 부피 무게 계산 <br />
                · <strong>(가로 x 세로 x 높이) / 6,000</strong>
            </div>
            <br/>

            <h3>🚚 배송비 설정 방식</h3>
            <h4>SSL(Shopee 제공) / Non-SSL(사용자 지정)</h4>
            <div className={styles.infoBox}>
                <strong>Shopee 제공 배송 옵션 (SSL)</strong>
                <div className={styles.sslBox}>
                    · <strong>Shopee Supported Logistics (SSL)</strong>
                    를 활성화하면 Shopee가 지원하는 배송 파트너 선택 가능<br/>
                    · 배송비는 <strong>무게 또는 부피 무게 중 높은 쪽</strong>
                    을 기준으로 계산됨<br/>
                </div>
                <br />
                <strong>사용자 지정 배송 방식 (Non‑SSL)</strong>
                <div className={styles.sslBox}>
                    · <strong>Direct shipping 또는 Non-SSL</strong>
                    옵션을 수동으로 입력 가능<br/>
                    · 배송비를 직접 명시하거나 무료 배송 옵션 선택도 가능
                </div>

            </div>
            <br />

            <br />
            <h3>이미지 참고</h3>
            <div className={styles.imgBox}>
                <img
                    src={step5}
                    alt="Global SKU 등록"
                    style={{ maxWidth: '100%', marginTop: '16px', borderRadius: '8px' }}
                    onClick={() => setModalSrc(step5)}
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

export default ShopeeStep5