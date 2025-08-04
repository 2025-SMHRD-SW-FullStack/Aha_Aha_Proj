import React, { useContext } from 'react'
import styles from './ShopeeStep6.module.css'
import ShopeeContext from '/src/provider/ShopeeFormContext.jsx'
import { useNavigate } from 'react-router-dom';
import { getUserIdFromToken } from '../../../util/jwt';
import { createDomesticPost } from '../../../service/domesticPostApi';
import { createForeignPost } from '../../../service/foreignPostApi';


const ShopeeStep6 = () => {
    const { formData, updateField } = useContext(ShopeeContext);
    const navigate = useNavigate();

     // File → base64 로 변환하는 Promise 함수
    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result)
        reader.onerror = e => reject(e)
        reader.readAsDataURL(file)
    })

    // 완료 버튼 클릭 시 게시글 등록
    const handleComplete = async () => {
        console.log("📦 formData 상태:", formData);

        // 필수값 확인
        if ((!formData.productName && !formData.productNameEn) ||
        (!formData.description && !formData.descriptionEn) ||
        (!formData.yourPrice && !formData.yourPriceEn)) {
        alert("상품명과 상세내용, 상품 가격을 입력해주세요.");
        return;
        }
        // if (!formData.productName || !formData.description || !formData.yourPrice) {
        //     alert("상품명과 상세내용, 상품 가격을 입력해주세요.");
        //     return;
        // }

        // 🧠 sessionStorage에 정보 저장 (DB 연동 대신)
        // const id = Date.now();
        // sessionStorage.setItem(`product-id-${id}`, id);
        // sessionStorage.setItem(`product-title-${id}`, formData.productName);
        // sessionStorage.setItem(`product-content-${id}`, formData.description);
        // sessionStorage.setItem(`product-url-${id}`, formData.externalUrl ?? '');
        // sessionStorage.setItem(`product-platform-${id}`, "shopee");
        // sessionStorage.setItem(`product-yourPrice-${id}`, formData.yourPrice ?? '');

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

        // ✅ 이미지 저장 (Blob / string 둘 다 처리)
    // 1) 이미지가 있으면 base64로 변환
    let imgData = ''
    if (formData.images?.length > 0) {
        try {
            imgData = await toBase64(formData.images[0])
        } catch (err) {
            console.error("이미지 변환 실패:", err)
        }
    }
    // sessionStorage.setItem(`product-image-${id}`, imgData)  // 수정: FileReader 제거, imgData 저장

    // API 전송용 공통 데이터
    const commonData = {
        userId: getUserIdFromToken(),                                          // 상세내용
        // yourPrice: formData.yourPrice,  
        img: imgData,                                                          // 이미지 URL or 빈 문자열
        url: formData.externalUrl ?? '',                                       // 외부 판매 링크
        platform: 'shopee',                                                    // 플랫폼 구분
    }

    // 국내 게시판용
    const domesticPost = {
        ...commonData,
        yourPrice : formData.yourPrice,
        title: formData.productName,
        content: formData.description,
    }

    // 해외 게시판용
    const foreignPost = {
        ...commonData,
        yourPrice : formData.yourPriceEn,
        title: formData.productNameEn,
        content: formData.descriptionEn,
    }

    // 서버에 저장
    try {
        await createDomesticPost(domesticPost)
        await createForeignPost(foreignPost)
        alert("상품 등록이 완료되었습니다.");
        navigate('/mypage/product_list');
    } catch (err) {
        console.error(err)
        alert("상품 등록 중 오류가 발생했습니다.");
        return
    }
    
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
            <br />

            <div>
                <a 
                href="https://seller.shopee.kr"
                target="_blank"
                rel="noopener noreferrer"
                >
                <h3 className={styles.linkHover} style={{color: '#4078FF'}}>쇼피에 판매 등록하러 바로가기 ↘️</h3>
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