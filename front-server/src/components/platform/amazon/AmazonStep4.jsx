import React, { useContext, useState } from 'react'
import styles from './AmazonStep4.module.css'
import NewProductForm from './NewProductForm';
import ExistingProductForm from './ExistingProductForm';
import AmazonFormContext from '../../../provider/AmazonFormContext';
import translateApi from '../../../service/translateApi';

const AmazonStep4 = () => {
    const [registerType, setRegisterType] = useState('new'); // 기본값 새 상품 정보 입력
    const { formData, updateField } = useContext(AmazonFormContext);

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
                'yourPriceEn',
                'listPrice',
                'listPriceEn'
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
            // toTranslate.yourPrice = formData.yourPrice;
            // toTranslate.listPrice = formData.listPrice;

            // [추가]
            // 가격 환산 로직 추가 : KRW -> USD 계산하여 yourPriceEn에 저장
            const USD_PER_KRW = 0.00072;
            // yourPrice 환산
            // const rawYourPrice = formData.yourPrice || '';
            // const yourKrw = Number(rawYourPrice.replace(/[^0-9.-]/g, '')) || 0;
            // const yourUsd = (yourKrw * USD_PER_KRW).toFixed(2);
            // updateField('yourPriceEn', yourUsd);

            // // listPrice 환산
            // const rawListPrice = formData.listPrice || '';
            // const listKrw = Number(rawListPrice.replace(/[^0-9.-]/g, '')) || 0;
            // const listUsd = (listKrw * USD_PER_KRW).toFixed(2);
            // updateField('listPriceEn', listUsd);

            // yourPrice 환산
            const rawYour = formData.yourPrice.replace(/[^0-9.-]/g, '') || '0';
            const yourUsd = (Number(rawYour) * USD_PER_KRW).toFixed(2);
            updateField('yourPriceEn', yourUsd);

            // listPrice 환산 (listPrice 값이 있을 때만)
            if (formData.listPrice) {
            const rawList = formData.listPrice.replace(/[^0-9.-]/g, '') || '0';
            const listUsd = (Number(rawList) * USD_PER_KRW).toFixed(2);
            updateField('listPriceEn', listUsd);
}
    
            const translatedData = await translateApi(toTranslate);
    
            // 결과 반영 (단, productName과 description은 En 필드에 저장)
            Object.entries(translatedData).forEach(([key, value]) => {
                if (key === 'productName') {
                    updateField('productNameEn', value);
                } else if (key === 'description') {
                    updateField('descriptionEn', value);
                // } else if (key === 'yourPrice') {
                //     // 번역 결과가 numeric string일 경우 yourPriceEn에 저장
                //     updateField('yourPriceEn', value);
                // } else if (key === 'listPrice') {
                //     updateField('listPriceEn', value);
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
                    <label className={styles.customLabel}>
                    <input className={styles.customInput}
                        style={{marginRight:'5px'}}
                        type="radio" 
                        name="registerType" 
                        value="new"
                        checked={registerType === 'new'}
                        onChange={() => setRegisterType('new')}
                    /> 
                    새 상품 정보 입력
                    </label>
                    <label className={styles.customLabel}>
                    <input className={styles.customInput}
                        style={{marginRight:'5px'}}
                        type="radio" 
                        name="registerType" 
                        value="existing"
                        checked={registerType === 'existing'}
                        onChange={() => setRegisterType('existing')}
                    /> 
                    기존 상품 정보 입력
                    </label>
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

            <h2>4단계 : 상품 정보 입력</h2>
            <div className={styles.step4InfoBox}>
                <p>
                    · 아마존에서 상품 정보를 입력할 때, 기본적으로 <strong>Required Attributes(필수 항목만 보기)</strong>로 
                    <div style={{marginLeft:'12px'}}>되어있어 일부 필드만 표시됩니다.</div>
                    · 하지만 실제 등록할 때는 <strong>All Attribute(모든 항목 보기)</strong>로 전환해서 입력하는 것이 좋습니다. <br/>
                    · 해당 설정은 상품 등록 페이지 왼측 메뉴 내 <strong>[Attributes]</strong>를 <strong>[All attributes]</strong>로 선택하면 됩니다.
                </p>
            </div>
            <br />

            {/* 선택에 따라 다른 컴포넌트 보여주기 */}
            {registerType === 'new'  ? <NewProductForm/>  : <ExistingProductForm/>}
        </div>
    )
}

export default AmazonStep4