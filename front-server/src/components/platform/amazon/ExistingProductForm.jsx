import React, { useContext } from 'react'
import styles from './AmazonStep4.module.css'
import AmazonFormContext from '../../../provider/AmazonFormContext';
import CopyButton from '../../common/CopyButton';

const ExistingProductForm = () => {
    const { formData, updateField } = useContext(AmazonFormContext);

    return (
        <div>
            {/* 기존 상품 등록용 Offer */}
            <h2>✅ 기존 상품 정보 입력</h2>
            <h3>📦 Offer</h3>
            <h4>배송, 재고 관리, 판매가 등 판매 관련 필수 정보</h4><br/>

                {/* Offer 섹션 가격 입력 */}
                <div className={styles.userInputBox}>
                {/* KRW 입력 필드 */}
                <label className={styles.customLabel}>Your Price (KRW):</label>
                <span className={styles.priceBox}>₩</span>
                <input
                    className={styles.customInput}
                    type="text"
                    value={formData.yourPrice}
                    onChange={(e) => {
                        const x = e.target.value;
                        updateField('yourPrice', x);
                        if (x === '') updateField('yourPriceEn', '');
                    }}
                    placeholder="번역하기 누르면 환산됩니다."
                />
                {/* 복사 버튼 */}
                <div style={{ position: 'absolute', right: '8px', top: '60%', transform: 'translateY(-50%)' }}>
                    <CopyButton text={formData.yourPriceEn} />
                </div>
                <br/>

                {/* USD 환산 결과 (읽기 전용) */}
                <label className={styles.customLabel}>Converted Price (USD):</label>
                <span className={styles.priceBox}>$</span>
                <input
                    className={styles.customInput}
                    type="text"
                    value={formData.yourPriceEn}
                    readOnly
                    placeholder=" "
                />
                <br/>
            </div>
            <p className={styles.infoBox}>· 판매 상품의 기준 가격을 입력</p>
            <br/>

            <div className={styles.userInputBox}>
                <label className={styles.customLabel}>Item Condition:</label>
                <select
                    name="itemCondition"
                    value={formData.itemCondition || ''}
                    onChange={(e) => updateField('itemCondition', e.target.value)}
                >
                    <option value="">선택</option>
                    <option value="new">New</option>
                    <option value="used">Used</option>
                </select><br/>            
            </div>
            <div className={styles.infoBox}>
                · 판매 상품의 실제 상품 상태 (i.e. 신규, 중고) 선택 <br />
                <p className={styles.infoColor}>
                ※ 상품 상태의 경우 최초 기입 이후에 수정 불가
                </p>
            </div>
            <br/>

            <div className={styles.userInputBox}>
                <label className={styles.customLabel}>Max Order Quantity:</label>
                <input className={styles.customInput}
                    type="text"
                    name="maxOrderQty"
                    value={formData.maxOrderQty || ''}
                    onChange={(e) => updateField('maxOrderQty', e.target.value)}
                    placeholder='Ex: 7'
                /><br/>
                {/* 복사 버튼 (입력값 복사) */}
                <div style={{
                    position: 'absolute',
                    right: '8px',
                    top: '60%',
                    transform: 'translateY(-50%)'
                    }}>
                    <CopyButton text={formData.maxOrderQty} />
                </div>
            </div>
            <div className={styles.infoBox}>
                · 주문 당 판매 상품을 구매할 수 있는 최대 수량 확인
            </div>
            <br/>

            <div className={styles.userInputBox}>
                <label className={styles.customLabel}>Fulfillment Channel:</label><br/>
                <label className={styles.customLabel}>
                    <input className={styles.customInput}
                        type="radio" 
                        name="fulfillment" 
                        value="fbm" 
                        checked={formData.fulfillment === 'fbm'}
                        onChange={(e) => updateField('fulfillment', e.target.value)}
                    /> [FBM] I will ship this item myself (Merchant Fulfilled)
                </label><br/>
                <label className={styles.customLabel}>
                    <input className={styles.customInput}
                        type="radio" 
                        name="fulfillment" 
                        value="fba" 
                        checked={formData.fulfillment === 'fba'}
                        onChange={(e) => updateField('fulfillment', e.target.value)}
                    /> [FBA] Amazon will ship and provide customer service (Fulfilled by Amazon)
                </label><br/>
            </div>
            <div className={styles.infoBox}>
                · 판매 상품의 주문 처리 방식 선택 <br/>
                · <strong>[FBM]</strong> : 판매자가 직접 배송 <br/>
                · <strong>[FBA]</strong> : Amazon에서 배송 및 고객 서비스를 제공
            </div>
        </div>
    )
}

export default ExistingProductForm