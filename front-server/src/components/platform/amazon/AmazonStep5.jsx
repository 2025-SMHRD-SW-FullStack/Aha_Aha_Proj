import React, { useContext } from 'react'
import styles from './AmazonStep5.module.css'
import AmazonFormContext from '/src/provider/AmazonFormContext'

const AmazonStep5 = () => {
    const { formData, updateField } = useContext(AmazonFormContext);

    return (
        <div className={styles.container}>
            <h2>5단계: 리스팅 완료</h2>
            <br />
            <h3>💾 Save and finish</h3>
            <h4>모든 사항 작성 후 <strong>[Save and finish]</strong> 클릭</h4>
            <br />
            <p className={styles.infoBox}>
            · 주문 처리 방식으로 FBA를 선택하셨다면, 리스팅 된 상품의 재고를 아마존 주문처리 센터로 보내야 합니다.
            본 프로세스에 대한 상세 안내는 별도 가이드를 참고해주세요.
            </p>


            {/* 체크박스 */}
            <div className={styles.userInputBox}>
                <label style={{fontWeight: 'normal'}}>
                    <input 
                        type="checkbox"
                        className={styles.checkbox}
                        checked={formData.postToBoard ?? true} // 기본 체크 상태
                        onChange={(e) => updateField('postToBoard', e.target.checked)} 
                    />
                    작성하신 상세 입력 판매 글을 <strong>Global Go</strong>의 게시판에도 게시하겠습니까?
                </label>
            </div>
            {/* URL 입력창 */}
            <div className={styles.userInputBox}>
            <label className={styles.step5Label}>📎 상품 관련 외부 링크(URL):</label>
                    <input
                        type="text"
                        className={styles.step5Input}
                        value={formData.externalUrl || ''}
                        onChange={(e) => updateField('externalUrl', e.target.value)}
                        placeholder="아마존에 등록한 상품 판매 링크를 적어주세요"
                    />
            </div>

            <button className={styles.step5Btn}>완료</button>
        </div>
    )
}

export default AmazonStep5