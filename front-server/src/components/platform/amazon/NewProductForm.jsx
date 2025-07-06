import React, { useContext } from 'react'
import styles from './AmazonStep4.module.css'
import styles2 from './Amazon.module.css'
import step4 from '/src/assets/images/amazon/step4.png'
import AmazonFormContext from '/src/provider/AmazonFormContext'
import ImageBox from '../../common/ImageBox'
import CopyButton from '/src/components/common/CopyButton.jsx'

const NewProductForm = () => {
    const { formData, updateField } = useContext(AmazonFormContext);

    // 체크박스 토글 핸들러 (Product ID 없음)
    const handleNoProductIdChange = (e) => {
        const checked = e.target.checked
        updateField('noProductId', checked)
        if (checked) {
        // 체크하면 기존 입력값 초기화
        updateField('productId', '')
        updateField('productIdType', '')
        }
    }

    // 체크박스 토글 핸들러 (Brand Name 없음)
    const handleNoBrandNameChange = (e) => {
        const checked = e.target.checked
        updateField('noBrandName', checked)
        if (checked) {
        // 체크하면 기존 입력값 초기화
        updateField('brandName', '')
        }
    }


    return (
        <div>
            <h2>✅ 새 상품 정보 입력</h2>
            {/* 1. Product Identity */}
            <h3>✉️ Product Identity</h3>
            <h4>상품ID, 상품명, 브랜드명과 같은 필수 정보</h4><br />

            <div className={styles.userInputBox}>
                <label className={styles.customLabel}>Variations</label>
                <label style={{fontWeight:'normal'}} className={styles.customLabel}>
                    <input className={styles.customInput}
                        type="radio" 
                        name="variations" 
                        value="yes"
                        checked={formData.variations === 'yes'}
                        onChange={(e) => updateField('variations', e.target.value)}
                        /> Yes   
                </label>
                <label style={{fontWeight:'normal'}} className={styles.customLabel}>
                    <input className={styles.customInput}
                        type="radio" 
                        name="variations" 
                        value="no" 
                        checked={formData.variations === 'no'}
                        onChange={(e) => updateField('variations', e.target.value)}
                        /> No <br/>
                </label>
            </div>
            <p className={styles.infoBox}>· 단일 상품 상세 페이지를 통해 동일 상품에 대한 선택사항 제공 여부 선택</p>
            <br/>

            <div className={styles.userInputBox}>
                <label className={styles.customLabel}>Product ID:</label>
                <input className={styles.customInput}
                    type="text" 
                    value={formData.productId} 
                    onChange={(e) => updateField('productId', e.target.value)}
                    placeholder="5.27917E+12" 
                    />
                    {/* 복사 버튼 (입력값 복사) */}
                    <div style={{
                    position: 'absolute',
                    right: '8px',
                    top: '40%',
                    transform: 'translateY(-50%)'
                    }}>
                    <CopyButton text={formData.productId} />
                    </div>
                            
                <select
                    style={{marginLeft:'10px'}}
                    value={formData.productIdType}
                    onChange={(e) => updateField('productIdType', e.target.value)}
                    >
                    <option value="">선택</option>
                    <option value="gtin">GTIN</option>
                    <option value="upc">UPC</option>
                    <option value="asin">ASIN</option>
                </select><br />
                <label className={styles.customLabel}>
                <input className={styles.customInput}
                    style={{marginRight:'5px'}}
                    type="checkbox"
                    checked={formData.noProductId} 
                    onChange={handleNoProductIdChange}
                    /> I don’t have a Product ID
                </label>
                <br/>
            </div>
            <div className={styles.infoBox}>
                · GTIN, UPC, ASIN 등 올바른 상품 ID 종류 및 번호를 입력 <br />
                · 상품 ID 없는 경우 <strong>[I don’t have a Product ID]</strong> 체크 박스 선택
            </div>
            <br/>

            <div className={styles.userInputBox}>
                <label className={styles.customLabel}>Product Name:</label>
                <input className={styles.customInput}
                    type="text"
                    value={formData.productName} 
                    onChange={(e) => updateField('productName', e.target.value)}
                    placeholder="[브랜드] 상품명 + 특성" 
                />
                {/* 복사 버튼 (입력값 복사) */}
                <div style={{
                    position: 'absolute',
                    right: '8px',
                    top: '60%',
                    transform: 'translateY(-50%)'
                    }}>
                    <CopyButton text={formData.productName} />
                </div>
                <br/>
            </div>
            <div className={styles.infoBox}>
                · 최대 250자를 넘지 않도록 브랜드와 제품 정보를 간결하게 요약 <br/>
                <p className={styles.infoColor}>
                ※ 접속사, 전치사, 관사를 제외한 단어의 첫 글자는 대문자로 표기 <br/>
                ※ 숫자는 실제 숫자로 표기하고, 단위는 ‘cm’와 같은 줄임말로 표기 <br/>
                ※ 상품 가격, 타 셀러와 비교, 주관적인 프로모션 표현(i.e. Best Seller) 금지
                </p>
            </div>
            <br/>

            <div className={styles.userInputBox}>
                <span style={{color:'red'}}>★ </span><label className={styles.customLabel}>Brand Name:</label>
                <input className={styles.customInput} 
                    type="text" 
                    placeholder="브랜드명" 
                    value={formData.brandName} 
                    onChange={(e) => updateField('brandName', e.target.value)}
                /><br/>
                <label className={styles.customLabel}>
                    <input className={styles.customInput}
                        style={{marginRight:'5px'}}
                        type="checkbox" 
                        value={formData.noBrandName} 
                        onChange={handleNoBrandNameChange}
                    /> This product does not have a brand name
                </label>
                <br/>
                {/* 복사 버튼 (입력값 복사) */}
                <div style={{
                    position: 'absolute',
                    right: '8px',
                    top: '40%',
                    transform: 'translateY(-50%)'
                    }}>
                    <CopyButton text={formData.brandName} />
                </div>
            </div>
            <div className={styles.infoBox}>
                · 상품의 비/상표 여부 및 상표권 보유 여부에 따른 상품 등록 권고 절차가 상이하므로 이어지는 페이지를 통해 개별 상세 케이스 필수 참고 <br />
                · 브랜드 레지스트리에 등록한 브랜드 명 입력해야 함 <br />
                · 브랜드 이름 없으면 <strong>[This product does not have a brand name]</strong> 체크 박스 선택
            </div>

            <br/><br/>
            <hr />
            <br />

            {/* 2. Offer */}
            <h3>📦 Offer</h3>
            <h4>배송, 재고 관리, 판매가 등 판매 관련 필수 정보</h4><br/>

            <div className={styles.userInputBox}>
                <label className={styles.customLabel}>Your Price:</label>
                <span className={styles.priceBox}>USD$</span> 
                <input className={styles.customInput}
                    type="text" 
                    value={formData.yourPrice} 
                    onChange={(e) => updateField('yourPrice', e.target.value)}
                    placeholder="Ex: 50.00" 
                />
                <br/>
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
            <p className={styles.infoBox}>
                · 판매 상품의 기준 가격을 입력
            </p>
            <br/>

            <div className={styles.userInputBox}>
                <label className={styles.customLabel}>List Price:</label>
                <span className={styles.priceBox}>USD$</span> 
                <input className={styles.customInput}
                    type="text" 
                    value={formData.listPrice} 
                    onChange={(e) => updateField('listPrice', e.target.value)}
                    placeholder="Ex: 50.00" 
                />
                <br/>
                {/* 복사 버튼 (입력값 복사) */}
                <div style={{
                    position: 'absolute',
                    right: '8px',
                    top: '60%',
                    transform: 'translateY(-50%)'
                    }}>
                    <CopyButton text={formData.listPrice} />
                </div>
            </div>
            <div className={styles.infoBox}>
                · 세금을 포함하여 판매 상품의 정가를 입력 <br />
                <div className={styles.infoColor}>
                ※ ‘정가’의 경우 제조업체, 공급업체 또는 판매자가 제공하는 권장 소매가를 의미 <br/>
                ※ <strong>[Your Price]</strong> 및 <strong>[List Price]</strong> 정보를 동일하게 입력하는 것을 권고함
                </div>
            </div>
            <br/>

            <div className={styles.userInputBox}>
                <label className={styles.customLabel}>Item Condition:</label>
                <select
                    value={formData.itemCondition} 
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
                <input 
                    className={`${styles.maxInputBox} ${styles.customInput}`}
                    type="text" 
                    value={formData.maxOrderQty} 
                    onChange={(e) => updateField('maxOrderQty', e.target.value)}
                    placeholder='Ex: 7' 
                />
                <br/>
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
                    /> 
                    [FBM] I will ship this item myself (Merchant Fulfilled)
                </label><br/>
                <label className={styles.customLabel}>
                    <input className={styles.customInput}
                        type="radio" 
                        name="fulfillment" 
                        value="fba" 
                        checked={formData.fulfillment === 'fba'} 
                        onChange={(e) => updateField('fulfillment', e.target.value)}
                    /> 
                    [FBA] Amazon will ship and provide customer service (Fulfilled by Amazon)
                </label><br/>
            </div>
            <div className={styles.infoBox}>
                · 판매 상품의 주문 처리 방식 선택 <br/>
                · <strong>[FBM]</strong> : 판매자가 직접 배송 <br/>
                · <strong>[FBA]</strong> : Amazon에서 배송 및 고객 서비스를 제공
                
            </div>

            <br/><br/>
            <hr />
            <br />

            {/* 3. Keywords */}
            <h3>🔍 Keywords</h3>
            <h4>상품 노출 최적화를 위한 검색 키워드 및 타겟 소비자 정보</h4><br/>

            <div className={styles.userInputBox}>
                <label className={styles.customLabel}>Search Terms:</label>
                <input className={styles.customInput}
                    type="text" 
                    value={formData.searchTerms} 
                    onChange={(e) => updateField('searchTerms', e.target.value)}
                    placeholder="검색 키워드" 
                /><br/>
                {/* 복사 버튼 (입력값 복사) */}
                <div style={{
                    position: 'absolute',
                    right: '8px',
                    top: '60%',
                    transform: 'translateY(-50%)'
                    }}>
                    <CopyButton text={formData.searchTerms} />
                </div>
            </div>
            <div className={styles.infoBox}>
                · 소비자가 판매 상품을 구매를 가정했을 때 가장 검색할법한 키워드 입력 <br/>
                <p className={styles.infoColor}>
                ※ 브랜드 레지스트리 등록 시 ‘Search Query Performance Report’와 같은 도구를 추가적으로 이용하여 어떤 키워드를 통해 판매 상품 / 브랜드로의 유입이 높은 지 확인할 수 있음
                </p>
            </div>

            <br/><br/>
            <hr/>
            <br/>

            {/* 4. Images */}
            <h3>🖼️ Images</h3>
            <h4>상품을 식별하고 탐색할 수 있게 하는 상품 이미지 정보</h4><br/>

            <ImageBox maxImages={7} allowVideo={true} platform="amazon"/>
            <br />
            <div className={styles.infoBox}>
                · 고화질의 메인 이미지를 포함해 총 7장 등록 <br/>
                <div className={styles.infoColor}>
                ※ 동영상 업로드시 6장만 반영 <br/>
                ※ 제일 첫번째로 등록되는 이미지를 메인 이미지로 고려 <br/>
                ※ 메인 이미지는 흰 배경 및 프레임 내 제품 비 85% 이상 차지 필수 <br/>
                ※ 두 번째부터는 아래의 조건을 고려한 자유로운 양식 업로드 권고 <br/>
                    <p className={styles.imageInfo}>
                        1) 사진 확장 기능을 고려, 긴 면의 길이는 최소 1,600px 이상 <br/>
                        2) JPEG, TIFF 또는 정지된 GIF 양식 <br/>
                        3) 전문적인 제품 이미지 <br/>
                    </p>
                ※ 흐릿하거나 픽셀이 깨진 이미지는 사용 불가
                </div>
            </div>
            <br />
            <h3>이미지 참고</h3>
            <div className={styles2.imgBox}>
                <img
                    src={step4}
                    alt="셀러 센트럴 접속"
                    style={{ maxWidth: '100%', marginTop: '16px', borderRadius: '8px' }}
                />
            </div>
            
            <br/><br/>
            <hr />
            <br/>

            {/* 5. Description */}
            <h3>📖 Description</h3>
            <h4>상품에 대한 설명 및 기타 유의 사항을 개괄하는 상세 정보</h4><br/>
            <div className={styles.textareaBox}>
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
                {/* 복사 버튼 (입력값 복사) */}
                <div style={{
                    position: 'absolute',
                    right: '8px',
                    top: '10%',
                    transform: 'translateY(-50%)'
                    }}>
                    <CopyButton text={formData.description} />
                </div>
            </div>
            <div className={styles.infoBox}>
                · 상세 페이지에 단락으로 요약된 상세 상품 관련 설명 작성 <br/>
                <p className={styles.infoColor}>
                ※ 소비자가 해당 상품을 소유하고 싶어지도록 상품 고유의 구체적인 디자인, 기능, 사양 정보와 더불어 상품 관리와 보증에 정보 함께 개괄 <br/>
                ※ 간결하되 완전한 서술형 문장을 짧은 단락으로 작성 <br/>
                ※ 상품 가격, 타 셀러와 비교, 주관적인 프로모션성 내용 금지
                </p>
            </div>
            <br/>
            
            <div className={styles.textareaBox}>
                <label className={styles.customLabel}>Key Product Features:</label>
                <div className={styles.userInputBox}>
                    <textarea
                        className={`${styles.textarea} ${formData.keyFeatures ? styles.textareaFilled : ''}`} 
                        rows="5" 
                        value={formData.keyFeatures} 
                        onChange={(e) => updateField('keyFeatures', e.target.value)}
                        placeholder="100자 이하의 요약한 기능" 
                    /><br/>
                </div>
                {/* 복사 버튼 (입력값 복사) */}
                <div style={{
                    position: 'absolute',
                    right: '8px',
                    top: '10%',
                    transform: 'translateY(-50%)'
                    }}>
                    <CopyButton text={formData.keyFeatures} />
                </div>
            </div>
            <div className={styles.infoBox}>
                · 타 유사 상품과 차별화되는 본 상품만의 기능 혹은 특징 소구 <br/>
                <p className={styles.infoColor}>
                ※ 각 목록을 100자 이하로 간결하게 작성 <br/>
                ※ 완전한 서술형 문장이 아닌 단축된 문장의 형태로 작성 <br/>
                ※ 각 목록의 첫 글자를 대문자로 표기 (Product Title과 같이 각 단어를 대문자 표기하는 것은 불필요) <br/>
                ※ 상품 가격, 타 셀러와 비교, 주관적인 프로모션성 내용 금지
                </p>
            </div>

            <br/><br/>
            <hr />
            <br/>

            {/* 6. Compliance */}
            <h3>📄 Compliance</h3>
            <h4>상품에 대한 신뢰도를 제고해볼 수 있는 상품 관련 인증 정보</h4>
            <div className={styles.step4InfoBox}>
                · 상품 관련 인증 정보의 경우, 판매 카테고리에 따른 종류가 상이하므로, 인증을 요하는 대표 카테고리의 주요 인증 시험/마크 내역을 참고드립니다. <br/>    
            </div>

            <div className={styles.infoBox}>
                <div className={styles.complianceBox}>
                    <strong>■ 화장품</strong>
                    <p>FDA-OTC (선크림, 미백, 주름개선 등 기능성 화장품에만 필요)</p>
                    <p>※ 일반 화장품의 경우 별도 인증 불필요</p>
                    <strong>■ 식품</strong>
                    <p>FFR, COA, Labeling, SID, FCE, LACF, AF, FSVP, VQIP</p>
                    <strong>■ 전자기기</strong>
                    <p>FCC, UL, RF, EO</p>
                    <p>※ 규격 여부에 따라 상세 인증 달라지지만 판매를 위한 취득 권장</p>
                    <strong>■ 유아용품</strong> <br/>
                    <p>CPC</p>
                </div>
            </div>

            <br/><br/>
            <hr />
            <br/>

            {/* 7. Vital Info */}
            <h3>📂 Vital Info</h3>
            <h4>제조사, 제품 수량, 제품 용량, 유통 기한 같은 제조 관련 정보</h4><br/>

            <div className={styles.userInputBox}>
                <label className={styles.customLabel}>Manufacturer:</label>
                <input className={styles.customInput}
                    type="text" 
                    value={formData.manufacturer} 
                    onChange={(e) => updateField('manufacturer', e.target.value)}
                    placeholder='Ex: Homedics'
                /><br/>
                {/* 복사 버튼 (입력값 복사) */}
                <div style={{
                    position: 'absolute',
                    right: '8px',
                    top: '60%',
                    transform: 'translateY(-50%)'
                    }}>
                    <CopyButton text={formData.manufacturer} />
                </div>
            </div>
            <p className={styles.infoBox}>
            · 제조사 (제조 공장) 정보 입력
            </p>
            <br/>

            <div className={styles.userInputBox}>
                <label className={styles.customLabel}>Manufacturer Part Number:</label>
                <input className={styles.customInput}
                    type="text" 
                    value={formData.manufacturerPartNumber} 
                    onChange={(e) => updateField('manufacturerPartNumber', e.target.value)}
                    placeholder='Ex: SB-122'
                /><br/>
                {/* 복사 버튼 (입력값 복사) */}
                <div style={{
                    position: 'absolute',
                    right: '8px',
                    top: '60%',
                    transform: 'translateY(-50%)'
                    }}>
                    <CopyButton text={formData.manufacturerPartNumber} />
                </div>
            </div>
            <p className={styles.infoBox}>
            · 제품 고유 식별자인 제조업체 부품번호 (MPN) 정보 입력
            </p>
            <br/>

            <div className={styles.userInputBox}>
                <label className={styles.customLabel}>Is Product Expirable?</label>
                <select
                    value={formData.isExpirable} 
                    onChange={(e) => updateField('isExpirable', e.target.value)}
                >
                    <option value="">선택</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </select><br/>
            </div>
            <p className={styles.infoBox}>
            · 이 제품은 유효기간이 있나요?
            </p>
            <br/>

            <div className={styles.userInputBox}>
                <label className={styles.customLabel}>Number of Items:</label>
                <input className={styles.customInput}
                    type="text"
                    value={formData.numberOfItems} 
                    onChange={(e) => updateField('numberOfItems', e.target.value)}
                    placeholder='Ex: 6'
                /><br/>
                {/* 복사 버튼 (입력값 복사) */}
                <div style={{
                    position: 'absolute',
                    right: '8px',
                    top: '60%',
                    transform: 'translateY(-50%)'
                    }}>
                    <CopyButton text={formData.numberOfItems} />
                </div>
            </div>
            <p className={styles.infoBox}>
            · 하나의 포장에 제공되는 제품 수 확인 (i.e. 1박스 당 6개 포장 → 6 입력)
            </p>
            <br/>

            <div className={styles.userInputBox}>
                <label className={styles.customLabel}>Item Form:</label>
                <input className={styles.customInput}
                    type="text" 
                    value={formData.itemForm} 
                    onChange={(e) => updateField('itemForm', e.target.value)}
                    placeholder='Ex: heat-pack' 
                /><br/>
                {/* 복사 버튼 (입력값 복사) */}
                <div style={{
                    position: 'absolute',
                    right: '8px',
                    top: '60%',
                    transform: 'translateY(-50%)'
                    }}>
                    <CopyButton text={formData.itemForm} />
                </div>
            </div>
            <br/>

            <div className={styles.userInputBox}>
                <label className={styles.customLabel}>Unit Count:</label>
                <input className={styles.customInput}
                    type="text" 
                    value={formData.unitCount} 
                    onChange={(e) => updateField('unitCount', e.target.value)}
                    placeholder='Ex: 1'
                /><br/>
                {/* 복사 버튼 (입력값 복사) */}
                <div style={{
                    position: 'absolute',
                    right: '8px',
                    top: '60%',
                    transform: 'translateY(-50%)'
                    }}>
                    <CopyButton text={formData.unitCount} />
                </div>
            </div>
            <p className={styles.infoBox}>
            · 하나의 포장 단위 개수 확인 (i.e. 1박스 당 6개 포장 → 1 입력)
            </p>
            <br/>

            <div className={styles.userInputBox}>
                <label className={styles.customLabel}>Unit Count Type:</label>
                <input className={styles.customInput}
                    type="text" 
                    value={formData.unitCountType} 
                    onChange={(e) => updateField('unitCountType', e.target.value)}
                    placeholder='Ex: Count, Gram..'
                /><br/>
                {/* 복사 버튼 (입력값 복사) */}
                <div style={{
                    position: 'absolute',
                    right: '8px',
                    top: '60%',
                    transform: 'translateY(-50%)'
                    }}>
                    <CopyButton text={formData.unitCountType} />
                </div>
            </div>
            <p className={styles.infoBox}>
            · 하나의 포장 단위 당 개수, 무게, 부피 등의 상세 정보 확인
            </p>
            <br/>

            <div className={styles.userInputBox}>
                <label className={styles.customLabel}>Is the Item Heat Sensitive?</label>
                <select
                    value={formData.heatSensitive} 
                    onChange={(e) => updateField('heatSensitive', e.target.value)}
                >
                    <option value="">선택</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </select><br/>
            </div>
            <p className={styles.infoBox}>
            · 이 제품은 열에 민감한가요?
            </p>

            <br/><br/>
            <hr />
            <br/>

            {/* 8. Variations */}
            <h3>🔹 Variations</h3>
            <h4>색상, 패턴, 사이즈와 길이 동일 상품에 대한 상세 옵션 정보</h4><br/>
            <div className={styles.infoBox}>
                · <strong>[Product Identity] - [Variations]</strong> 속성 값으로 <strong>[YES]</strong>로 체크했다면, <strong>[Variations]</strong> 탭에서 상품의 세부 선택사항 관련 정보를 제공해야 함 <br/>
                <p className={styles.infoColor}>
                ※ 세부 선택사항 항목은 등록 상품의 카테고리에 따라 다르게 제공됩니다. <br/>
                ※ Variation 등록 방법의 경우 별도 가이드를 통해 참고 부탁드립니다.
                </p>
            </div>

            <br/><br/>
            <hr />
            <br/>

            {/* 9. More Details */}
            <h3>📝 More Details</h3>
            <h4>상품과 관련된 기타 추가 정보</h4>

            <div className={styles.step4InfoBox}>
                · 상품 관련 기타 상세 정보의 경우, 판매 카테고리에 따른 종류가 상이하므로, 상품 카테고리 별 염두해주셔야 하는 속성값을 아래와 같이 확인드립니다. <br/>    
            </div>

            <div className={styles.infoBox}>
                <div className={styles.complianceBox}>
                    <strong>■ 전자기기 </strong>
                    <p>FCC ID 입력 필요</p>
                    <strong>■ Bluetooth 기능 포함 상품 </strong>
                    <p>RF ID 입력 필요</p>
                    <strong>■ 공기 청정기 상품 </strong>
                    <p>캐나다 지역 내 원활한 판매를 위해 CARB에서 제공하는 EO 넘버 입력 입력 필요</p>
                </div>
            </div>
        </div>
    )
}

export default NewProductForm