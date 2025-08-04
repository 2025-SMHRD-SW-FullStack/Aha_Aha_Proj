import React, { useContext, useState } from 'react'
import styles from './Shopee.module.css'
import step2 from '/src/assets/images/shopee/step2.png'
import ShopeeContext from '/src/provider/ShopeeFormContext.jsx'
import translateApi from '../../../service/translateApi'
import CopyButton from '../../common/CopyButton'
import ImageModal from '../../chatbot/ImageModal'



const ShopeeStep2 = () => {
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
                'videoEn'
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

            <h2>2단계: Global SKU 등록</h2>
            <p className={styles.infoBox}>
                · Shopee 한국 셀러센터에서 <strong>Global SKU</strong>등록을 시작합니다. <br/>
            </p>
            <br/>
            
            <h3>📌 등록 절차</h3>
            <p>① 왼쪽 메뉴에서 <strong>[Product]</strong> 의 <strong>[Global SKU]</strong> 클릭</p>
            <p>② <strong>[Add a Global SKU]</strong> 버튼 클릭</p>
            <p>③ 아래 항목을 순서대로 입력/선택 후 <strong>[Next]</strong> 클릭</p>
            <br />

            <h3>🔤 Product Name</h3>
            <h4>상품명을 작성하는 창입니다</h4><br />

            <div className={styles.userInputBox}>
                <label className={styles.customLabel}>Product Name</label>
                <label style={{fontWeight:'normal'}} className={styles.customLabel}>
                    <input className={styles.customInput}
                        type="text" 
                        placeholder="ex) ABC Toothbrush Soft"
                        value={formData.productNameEn} 
                        onChange={(e) => {
                            updateField('productNameEn', e.target.value);
                            updateField('productName', e.target.value);
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
                    <CopyButton text={formData.productName} />
                </div>
            </div>
            <p className={styles.infoBox}>
                · 브랜드명 + 제품명 (영어로 작성)
            </p>
            <br/>

            <h3>📂 Category</h3>
            <h4>카테고리 목록 중 하나를 선택하는 창입니다</h4><br />
            <div className={styles.userInputBox}>
                <label className={styles.customLabel}>Category</label>
                <label style={{fontWeight:'normal'}} className={styles.customLabel}>
                    <input className={styles.categoryInput}
                        readOnly
                        type="text" 
                        placeholder="[카테고리는 Shopee가 제공하는 팝업 창에서 선택합니다.]"
                        value={formData.Category || ''} 
                        onChange={(e) => updateField('Category', e.target.value)}
                        />  
                </label>
            </div>
            <div className={styles.infoBox}>
                · Shopee에서 자동 추천된 카테고리 목록 중 하나를 선택합니다. <br />
                (예시: <strong>Beauty {'>'} Makeup {'>'} Face {'>'} Powder</strong>) 
            </div>
            <br/>

            <br />
            <h3>이미지 참고</h3>
            <div className={styles.imgBox}>
                <img
                    src={step2}
                    alt="Global SKU 등록"
                    style={{ maxWidth: '100%', marginTop: '16px', borderRadius: '8px' }}
                    onClick={() => setModalSrc(step2)}
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

export default ShopeeStep2