import React, { useContext } from 'react'
import styles from './Shopee.module.css'
import step3 from '/src/assets/images/shopee/step3.png'
import ShopeeContext from '/src/provider/ShopeeFormContext.jsx'
import ImageBox from '../../common/ImageBox'


const ShopeeStep3 = () => {
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

            <h2>3단계: 기본정보 입력</h2>
            <p className={styles.infoBox}>
                · Shopee 상품 등록 시, 기본적으로 필요한 <strong>이미지, 영상, 상세 설명</strong>
                을 입력하는 단계입니다. <br/>
                · <strong>Product Name</strong>과 <strong>Category</strong>는 2단계에서 이미 작성함 <br/>
            </p>
            <br/>

            <h3>🖼️ Product Images (상품 이미지)</h3>
            <h4>상품 이미지를 등록하는 창입니다</h4>
            <ImageBox maxImages={9} minImages={1} allowVideo={false} platform="shopee" />
            <br />
            <p className={styles.infoBox}>
                · 최소 1장, 최대 9장까지 등록 가능 <br/>
                <p className={styles.infoColor}>
                ※ 정사각형(1:1 비율), 고화질 이미지 권장 <br/>
                ※ 썸네일 자동 생성됨 <br/>
                </p>
            </p>
            <br />

            <h3>🎥 Product Video (상품 영상) (선택사항)</h3>
            <h4>상품 영상을 등록하는 창입니다</h4>
            <ImageBox maxImages={0} allowVideo={true} platform="shopee" />
            <br/>
            <p className={styles.infoBox}>
                · 필수 아님, 필요 시 1개 등록 가능 <br/>
                <p className={styles.infoColor}>
                ※ 최대 용량 30MB, 최대 해상도 1280x1280px <br/>
                </p>
            </p>
            <br />

            <h3>📝 Product Description (상세 설명)</h3>
            <h4>상품 상세 설명창입니다</h4><br />
            <label className={styles.customLabel}>Product Description:</label><br/>
            <div className={styles.userInputBox}>
                <textarea
                    className={`${styles.textarea} ${formData.description ? styles.textareaFilled : ''}`}
                    rows="5" 
                    value={formData.description} 
                    onChange={(e) => updateField('description', e.target.value)}
                    placeholder="상품의 기본 설명 글" 
                /><br/>
            </div>
            <p className={styles.infoBox}>
                · 상세 페이지에 단락으로 요약된 상세 상품 관련 설명 작성 <br />
                · 5000자 이내로 작성<br />
            </p>
            <br/>

            <br />
            <h3>이미지 참고</h3>
            <div className={styles.imgBox}>
                <img
                    src={step3}
                    alt="Global SKU 등록"
                    style={{ maxWidth: '100%', marginTop: '16px', borderRadius: '8px' }}
                />
            </div>
        </div>
    )
}

export default ShopeeStep3