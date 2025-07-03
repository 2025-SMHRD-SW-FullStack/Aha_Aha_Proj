import React, { useContext } from 'react'
import styles from './Shopee.module.css'
import step2 from '/src/assets/images/shopee/step2.png'
import ShopeeContext from '/src/provider/ShopeeFormContext.jsx'



const ShopeeStep2 = () => {
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
                        value={formData.ProductName || ''} 
                        onChange={(e) => updateField('ProductName', e.target.value)}
                        />  
                </label>
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
            <p className={styles.infoBox}>
                · Shopee에서 자동 추천된 카테고리 목록 중 하나를 선택합니다. <br />
                (예시: <strong>Beauty {'>'} Makeup {'>'} Face {'>'} Powder</strong>) 
            </p>
            <br/>

            <br />
            <h3>이미지 참고</h3>
            <div className={styles.imgBox}>
                <img
                    src={step2}
                    alt="Global SKU 등록"
                    style={{ maxWidth: '100%', marginTop: '16px', borderRadius: '8px' }}
                />
            </div>
        </div>
    )
}

export default ShopeeStep2