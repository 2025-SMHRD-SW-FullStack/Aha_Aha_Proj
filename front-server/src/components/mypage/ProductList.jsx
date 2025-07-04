import React, { useEffect, useState } from "react";
import styles from "./ProductList.module.css";
import defaultImage from '/src/assets/images/imgIcon.png';
import amazonLogo from '/src/assets/images/amazon_logo.png';
import shopeeLogo from '/src/assets/images/shopee_logo.png';
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // 저장된 상품 정보 불러오기
    const loaded = [];

    // 세션에 저장된 모든 키 탐색
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key.startsWith("product-url-")) {
        const id = key.replace("product-url-", "");
        loaded.push({
          id,
          url: sessionStorage.getItem(`product-url-${id}`),
          platform: sessionStorage.getItem(`product-platform-${id}`),
          title: sessionStorage.getItem(`product-title-${id}`),
          content: sessionStorage.getItem(`product-content-${id}`),
          price: sessionStorage.getItem(`product-price-${id}`),
          image: sessionStorage.getItem(`product-image-${id}`) || '', // ✅ 대표 이미지
        });
      }
    }

    setProducts(loaded);

  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.headerRow}>
        <h2 className={styles.title}>내 상품 리스트</h2>
        <p>등록된 상품 정보를 임시 저장소(sessionStorage)에서 불러옵니다.</p>
      </div>

      {products.length === 0 ? (
        <p className={styles.empty}>등록된 상품이 없습니다.</p>
      ) : (
        <div className={styles.grid}>
          {products.map((item) => (
            <div 
              key={item.id} 
              className={styles.card}
              onClick={() => navigate(`/product/${item.id}`)} // ✅ 클릭 시 이동
              style={{ cursor: 'pointer' }} // 클릭 가능한 느낌
              >
              <div className={styles.imageBox}>
              {item.image ? (
                <img src={item.image} alt="대표 이미지" className={styles.previewImage} />
              ) : (
                <img src={defaultImage} alt="기본 이미지" className={styles.previewImage} />
              )}
              </div>
              <div className={styles.textBox}>
                <p className={styles.productTitle}>{item.title || "제목 없음"}</p>
                <p className={styles.productPrice}>
                  💰 {item.price ? `${item.price}$` : "가격 정보 없음"}
                </p>

                <div className={styles.platformLabel}>
                  {item.platform === 'amazon' && (
                    <>
                      <img src={amazonLogo} alt="Amazon" className={styles.platformIcon} />
                      <span>Amazon</span>
                    </>
                  )}
                  {item.platform === 'shopee' && (
                    <>
                      <img src={shopeeLogo} alt="Shopee" className={styles.platformIcon} />
                      <span>Shopee</span>
                    </>
                  )}
                  {!['amazon', 'shopee'].includes(item.platform) && (
                    <span>🌐 플랫폼 미지정</span>
                  )}
                </div>

                {/* {item.url ? (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.productLink}
                  >
                    🔗 상품 보러가기
                  </a>
                ) : (
                  <div className={styles.productLinkDisabled}>
                    🕓 승인 대기 중
                  </div>
                )} */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
