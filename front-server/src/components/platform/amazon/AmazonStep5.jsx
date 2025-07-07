import React, { useContext } from 'react'
import styles from './AmazonStep5.module.css'
import AmazonFormContext from '/src/provider/AmazonFormContext'
import { useNavigate } from 'react-router-dom';
import { getUserIdFromToken } from './../../../util/jwt';
import { createDomesticPost } from '../../../service/domesticPostApi';
const AmazonStep5 = () => {
    // useEffect(() => {
    //     console.log("📦 Step5 진입 시 formData 상태:", formData);
    // }, []);

    const { formData, updateField } = useContext(AmazonFormContext);
    const navigate = useNavigate();

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload  = () => resolve(reader.result)
        reader.onerror = e => reject(e)
        reader.readAsDataURL(file)
    })

    // 완료 버튼 클릭 시 내 상품 리스트 + 게시판 등록
    const handleComplete = async () => {
        console.log("📦 formData 상태:", formData);

        if (!formData.productName || !formData.description || !formData.yourPrice) {
            alert("상품명과 상세내용, 상품 가격을 입력해주세요.");
            return;
        }

         // 🧠 sessionStorage에 정보 저장 (DB 연동 대신)
        //  const id = Date.now(); // 임시 고유 ID
        // sessionStorage.setItem(`product-id-${id}`, id);
        // sessionStorage.setItem(`product-title-${id}`, formData.productName);
        // sessionStorage.setItem(`product-content-${id}`, formData.description);
        // sessionStorage.setItem(`product-url-${id}`, formData.externalUrl ?? '');
        // sessionStorage.setItem(`product-platform-${id}`, "amazon");
        // sessionStorage.setItem(`product-price-${id}`, formData.yourPrice ?? '');

        // 🔄 이미지 기본값 (비워두기)
        // sessionStorage.setItem(`product-image-${id}`, '');

        // ✅ 이미지 저장
        // if (formData.images && formData.images.length > 0) {
        //     const firstImage = formData.images[0];
        //     const reader = new FileReader();
        
        //     reader.onload = () => {
        //     sessionStorage.setItem(`product-image-${id}`, reader.result);
        //     };
        
        //     reader.readAsDataURL(firstImage);
        // }

        // 1) 이미지 base64 변환
        let imgData = ''
        if (formData.images?.length > 0) {
        try {
            imgData = await toBase64(formData.images[0])
        } catch (e) {
            console.warn("이미지 변환 실패:", e)
        }
        }

        // 2) API 전송용 데이터 구성
        const postData = {
        userId:   getUserIdFromToken(),        // 로그인된 유저 ID
        title:    formData.productName,        // 상품명
        content:  formData.description,        // 상세내용
        img:      imgData,                     // base64 이미지 (또는 빈 문자열)
        url:      formData.externalUrl ?? '',  // 외부 링크
        platform: 'amazon',                    // 플랫폼
        yourPrice: formData.yourPrice          // 가격
        }
    
       // 3) 서버에 저장
        try {
            await createDomesticPost(postData)
            alert("상품 등록이 완료되었습니다.")
            navigate('/mypage/product_list');
        } catch (err) {
        console.error("등록 중 오류:", err)
        alert("상품 등록 중 오류가 발생했습니다.")
        return
        }
        

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