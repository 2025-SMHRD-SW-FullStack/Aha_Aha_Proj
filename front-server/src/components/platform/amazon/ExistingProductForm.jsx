import React, { useContext } from 'react'
import styles from './AmazonStep4.module.css'
import AmazonFormContext from '../../../provider/AmazonFormContext';

const ExistingProductForm = () => {
    const { formData, updateField } = useContext(AmazonFormContext);

    return (
        <div>
            {/* 기존 상품 등록용 Offer */}
            <h2>✅ 기존 상품 정보 입력</h2>
            <h3>📦 Offer</h3>
            <h4>배송, 재고 관리, 판매가 등 판매 관련 필수 정보</h4><br/>

            <div className={styles.userInputBox}>
                <label className={styles.customLabel}>Your Price:</label>
                <span className={styles.priceBox}>MXN$</span> 
                <input className={styles.customInput}
                    type="text" 
                    name="yourPrice"
                    value={formData.yourPrice || ''}
                    onChange={(e) => updateField('yourPrice', e.target.value)}
                    placeholder="Ex: 50.00" 
                /><br/>
            </div>
            <p className={styles.infoBox}>
                · 판매 상품의 기준 가격을 입력
            </p>
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
            <p className={styles.infoBox}>
                · 판매 상품의 실제 상품 상태 (i.e. 신규, 중고) 선택 <br />
                <p className={styles.infoColor}>
                ※ 상품 상태의 경우 최초 기입 이후에 수정 불가
                </p>
            </p>
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
            </div>
            <p className={styles.infoBox}>
                · 주문 당 판매 상품을 구매할 수 있는 최대 수량 확인
            </p>
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
            <p className={styles.infoBox}>
                · 판매 상품의 주문 처리 방식 선택 <br/>
                · <strong>[FBM]</strong> : 판매자가 직접 배송 <br/>
                · <strong>[FBA]</strong> : Amazon에서 배송 및 고객 서비스를 제공
            </p>
        </div>
    )
}

export default ExistingProductForm