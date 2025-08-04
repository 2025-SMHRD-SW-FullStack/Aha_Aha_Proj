import React, { useContext, useState } from 'react'
import styles from './Shopee.module.css'
import step4 from '/src/assets/images/shopee/step4.png'
import step4_option from '/src/assets/images/shopee/step4_option.png'
import ShopeeContext from '/src/provider/ShopeeFormContext.jsx'
import translateApi from '../../../service/translateApi'
import CopyButton from '../../common/CopyButton'
import ImageModal from '../../chatbot/ImageModal'


const ShopeeStep4 = () => {
    // 모달에 띄울 src 관리
    const [modalSrc, setModalSrc] = useState(null);

    const { formData, updateField } = useContext(ShopeeContext);

    const handleTranslate = async () => {
        try {
            const toTranslate = {};

            // 이미지 관련 키 방어적 제외 처리
            const excludedKeys = [
                'productNameEn',
                'descriptionEn',
                'mainImage',
                'mainImageEn',
                'images',
                'imagesEn',
                'video',
                'videoEn',
                'yourPrice',
                'yourPriceEn'
            ];
    
            // productName, description은 제외하고 ~~En 필드만 번역 대상 수집
            Object.entries(formData).forEach(([key, value]) => {
                if (
                    key.endsWith('En') &&
                    !excludedKeys.includes(key) &&
                    typeof value === 'string' &&
                    value.trim() !== ''
                ) {
                    toTranslate[key] = value;
                }
            });
    
            // 🔄 productName, description은 원본을 따로 포함
            toTranslate.productName = formData.productName;
            toTranslate.description = formData.description;

            // KRW → USD 변환 로직
            const USD_PER_KRW = 0.00072;
            const rawPrice = (formData.yourPrice || '').replace(/[^0-9.-]/g, '');
            const krwValue = Number(rawPrice) || 0;
            const usdValue = (krwValue * USD_PER_KRW).toFixed(2);
            updateField('yourPriceEn', usdValue);
    
            const translatedData = await translateApi(toTranslate);
    
            // 결과 반영 (단, productName과 description은 En 필드에 저장)
            Object.entries(translatedData).forEach(([key, value]) => {
                if (key === 'productName') {
                    updateField('productNameEn', value);
                } else if (key === 'description') {
                    updateField('descriptionEn', value);
                } else {
                    updateField(key, value); // brandNameEn 등은 그대로 덮어쓰기
                }
            });
    
            console.log('✅ 번역 성공:', translatedData);
        } catch (error) {
            console.error('AmazonStep4 번역 실패:', error);
            alert('번역 중 오류가 발생했습니다.');
        }
    };

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
                {/* 번역하기 버튼 */}
                <button className={styles.translateBtn} onClick={handleTranslate}>
                    번역하기
                </button>
                <br/>
            </div>

            <h2>4단계: 판매 정보 입력 (Sales Information)</h2>
            <div className={styles.infoBox}>
                · 이 단계에서는 기본 가격과 재고를 입력하고, 필요 시 <strong>옵션(Variations)</strong>
                기능을 활성화하여 
                <div style={{marginLeft:'12px'}}>색상/사이즈 등 다양한 상품 구성을 설정합니다.</div>
            </div>
            <br/>

            <h3>① 기본 입력 항목</h3>
            <h4>옵션이 없을 경우, 이 기본 값만 입력하면 등록 가능</h4><br />

            <div className={styles.userInputBox}>
                <label className={styles.customLabel}>Price</label>
                <label style={{fontWeight:'normal'}} className={styles.customLabel}>
                    <input className={styles.customInput}
                        type="text" 
                        placeholder="ex) 20"
                        value={formData.yourPrice || ''} 
                        onChange={(e) => updateField('yourPrice', e.target.value)}
                        />  
                </label>
                {/* 복사 버튼 (입력값 복사) */}
                <div style={{
                    position: 'absolute',
                    right: '8px',
                    top: '60%',
                    transform: 'translateY(-50%)'
                    }}>
                    <CopyButton text={formData.yourPrice} />
                </div>
            </div>
            <div className={styles.infoBox}>
                · 마켓별 최종판매가 설정툴을 참고해 최종판매가를 설정 <br /><br />
                <strong>💡TIP : 가격 결정 팁</strong> <br />
                <div className={styles.tipBox}>
                · 국내사입가 - 5,000원 <br />
                · 포장지+ 국내 집하지까지의 배송비 + 페이오니아 인출 수수료(1.2%) 등 - 2,500원 <br />
                · 판매 시 희망 이윤 - 2,500원 <br />
                · 상품가격 - 10,000원
                </div>
            </div>
            
            <br/>

            <div className={styles.userInputBox}>
                <label className={styles.customLabel}>Stock</label>
                <label style={{fontWeight:'normal'}} className={styles.customLabel}>
                    <input className={styles.customInput}
                        type="text" 
                        placeholder="ex) 10"
                        value={formData.Stock || ''} 
                        onChange={(e) => updateField('Stock', e.target.value)}
                        />  
                </label>
                {/* 복사 버튼 (입력값 복사) */}
                <div style={{
                    position: 'absolute',
                    right: '8px',
                    top: '60%',
                    transform: 'translateY(-50%)'
                    }}>
                    <CopyButton text={formData.Stock} />
                </div>
            </div>
            <p className={styles.infoBox}>
                · 보유한 재고를 정확하게 기입
            </p>
            <br/>

            <h3>② 옵션(Variations) 활성화</h3>
            <h4>최대 2개의 옵션 유형(예: 색상, 사이즈) 설정</h4><br />
            <div className={styles.userInputBox}>
                <label className={styles.customLabel}>Name</label>
                <label style={{fontWeight:'normal'}} className={styles.customLabel}>
                    <input className={styles.customInput}
                        type="text" 
                        placeholder="ex) Color"
                        value={formData.NameEn} 
                        onChange={(e) => {
                            updateField('NameEn', e.target.value);
                            updateField('Name', e.target.value);
                        }}
                        />  
                </label>
                {/* 복사 버튼 (입력값 복사) */}
                <div style={{
                    position: 'absolute',
                    right: '8px',
                    top: '60%',
                    transform: 'translateY(-50%)'
                    }}>
                    <CopyButton text={formData.Name} />
                </div>
            </div>
            <div className={styles.userInputBox}>
                <label className={styles.customLabel}>Options</label>
                <label style={{fontWeight:'normal'}} className={styles.customLabel}>
                    <input className={styles.customInput}
                        type="text" 
                        placeholder="ex) Red, Blue"
                        value={formData.OptionsEn} 
                        onChange={(e) => {
                            updateField('OptionsEn', e.target.value);
                            updateField('Options', e.target.value);
                        }}
                        />  
                </label>
                {/* 복사 버튼 (입력값 복사) */}
                <div style={{
                    position: 'absolute',
                    right: '8px',
                    top: '60%',
                    transform: 'translateY(-50%)'
                    }}>
                    <CopyButton text={formData.Options} />
                </div>
            </div>
            <div className={styles.infoBox}>
                · 색상이나 사이즈 등 옵션이 있을 경우 <strong>Variation(상품 옵션)</strong>
                으로 상품을 묶을 수 있음 <br />
                · <strong>Variation</strong>은 최대 50개(대량 업로드는 15개)까지 가능

            </div>
            <br />

            <h3>③ 옵션별 가격/재고 입력</h3>
            <h4>옵션 설정 시 아래에 자동으로 옵션 조합 리스트 생성</h4>
            <div className={styles.imgBox}>
                <img
                    src={step4_option}
                    alt="Global SKU 등록"
                    style={{ maxWidth: '100%', marginTop: '16px', borderRadius: '8px' }}
                    onClick={() => setModalSrc(step4_option)}
                />
            </div>
            <div className={styles.infoBox}>
                · 옵션에 따라 판매가와 수량이 다른 경우 숫자를 개별적으로 수정 <br />
                · 옵션에 상관없이 판매가가 모두 같은 경우 <strong>[Apply to All]</strong> 클릭 

            </div>
            <br/>

            <br />
            <h3>이미지 참고</h3>
            <div className={styles.imgBox}>
                <img
                    src={step4}
                    alt="Global SKU 등록"
                    style={{ maxWidth: '100%', marginTop: '16px', borderRadius: '8px' }}
                    onClick={() => setModalSrc(step4)}
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

export default ShopeeStep4