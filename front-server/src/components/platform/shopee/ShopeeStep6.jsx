import React, { useContext } from 'react'
import styles from './ShopeeStep6.module.css'
import ShopeeContext from '/src/provider/ShopeeFormContext.jsx'
import { useNavigate } from 'react-router-dom';


const ShopeeStep6 = () => {
    const { formData, updateField } = useContext(ShopeeContext);
    const navigate = useNavigate();

    const handleComplete = async () => {
        console.log("📦 formData 상태:", formData);

        if (!formData.productName || !formData.description || !formData.yourPrice) {
            alert("상품명과 상세내용, 상품 가격을 입력해주세요.");
            return;
        }

        // 🧠 sessionStorage에 정보 저장 (DB 연동 대신)
        const id = Date.now();
        sessionStorage.setItem(`product-id-${id}`, id);
        sessionStorage.setItem(`product-title-${id}`, formData.productName);
        sessionStorage.setItem(`product-content-${id}`, formData.description);
        sessionStorage.setItem(`product-url-${id}`, formData.externalUrl ?? '');
        sessionStorage.setItem(`product-platform-${id}`, "shopee");
        sessionStorage.setItem(`product-yourPrice-${id}`, formData.yourPrice ?? '');

        // 🔄 이미지 기본값 (비워두기)
        sessionStorage.setItem(`product-image-${id}`, '');

        // ✅ 이미지 저장
        if (formData.images && formData.images.length > 0) {
            const firstImage = formData.images[0];
            const reader = new FileReader();
        
            reader.onload = () => {
            sessionStorage.setItem(`product-image-${id}`, reader.result);
            };
        
            reader.readAsDataURL(firstImage);
        }

        // 실제 API 호출안하고 상태만 유지
        alert("상품 등록이 완료되었습니다. (저장만 진행됨)");
        navigate('/mypage/product_list');
    
    };

    return (
        <div className={styles.container}>
            <h2>6단계: 상품 게시</h2>
            <br />
            <h3>💾 Save and Public</h3>
            <h4>모든 사항 작성 후 <strong>[Save and Public]</strong> 클릭</h4>
            <br />
            <div className={styles.infoBox}>
            · 상품 등록을 마무리하는 단계입니다 <br />
            · 이전 1~5단계에서 입력한 모든 정보를 검토한 후, 
            <strong>상품을 저장하고 등록</strong>합니다.
            </div>


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
                        className={styles.step6Input}
                        value={formData.externalUrl ?? ''}
                        onChange={(e) => updateField('externalUrl', e.target.value)}
                        placeholder="쇼피에 등록한 상품 판매 링크를 적어주세요 (승인 대기중이면 생략)"
                    />
            </div>

            <button className={styles.step6Btn} onClick={handleComplete}>완료</button>
        </div>
    )
}

export default ShopeeStep6