import React, { useContext } from 'react'
import styles from './AmazonStep5.module.css'
import AmazonFormContext from '/src/provider/AmazonFormContext'
import { useNavigate } from 'react-router-dom';
const AmazonStep5 = () => {
    // useEffect(() => {
    //     console.log("📦 Step5 진입 시 formData 상태:", formData);
    // }, []);

    const { formData, updateField } = useContext(AmazonFormContext);
    const navigate = useNavigate();

    // 완료 버튼 클릭 시 내 상품 리스트 + 게시판 등록
    const handleComplete = async () => {
        console.log("📦 formData 상태:", formData);

        if (!formData.productName || !formData.description || !formData.yourPrice) {
            alert("상품명과 상세내용, 상품 가격을 입력해주세요.");
            return;
        }

         // 🧠 sessionStorage에 정보 저장 (DB 연동 대신)
         const id = Date.now(); // 임시 고유 ID
        sessionStorage.setItem(`product-id-${id}`, id);
        sessionStorage.setItem(`product-title-${id}`, formData.productName);
        sessionStorage.setItem(`product-content-${id}`, formData.description);
        sessionStorage.setItem(`product-url-${id}`, formData.externalUrl ?? '');
        sessionStorage.setItem(`product-platform-${id}`, "amazon");
        sessionStorage.setItem(`product-price-${id}`, formData.yourPrice ?? '');

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

        // 실제 API는 호출하지 않고 상태만 유지
        alert("상품 등록이 완료되었습니다. (저장만 진행됨)");
        navigate('/mypage/product_list');

    };

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
            <br />

            <div>
                <a 
                href="https://sellercentral.amazon.com"
                target="_blank"
                rel="noopener noreferrer"
                >
                <h3 className={styles.linkHover} style={{color: '#4078FF'}}>아마존에 판매 등록하러 바로가기 ↘️</h3>
                </a>
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
                        className={styles.step5Input}
                        value={formData.externalUrl ?? ''}
                        onChange={(e) => updateField('externalUrl', e.target.value)}
                        placeholder="아마존에 등록한 상품 판매 링크를 적어주세요 (승인 대기중이면 생략)"
                    />
            </div>

            <button className={styles.step5Btn} onClick={handleComplete}>완료</button>
        </div>
    )
}

export default AmazonStep5