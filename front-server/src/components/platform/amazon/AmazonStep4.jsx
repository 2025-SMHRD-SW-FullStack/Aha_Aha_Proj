import React, { useState } from 'react'
import styles from './AmazonStep4.module.css'
import NewProductForm from './NewProductForm';
import ExistingProductForm from './ExistingProductForm';

const AmazonStep4 = () => {
    const [registerType, setRegisterType] = useState('new'); // 기본값 새 상품 정보 입력

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
                        defaultChecked 
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
                <br/>
            </div>

            <h2>4단계 : 상품 정보 입력</h2>
            <div className={styles.step4InfoBox}>
                <p>
                    · 아마존에서 상품 정보를 입력할 때, 기본적으로 <strong>Required Attributes(필수 항목만 보기)</strong>로 되어있어 일부 필드만 표시됩니다.<br/>
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