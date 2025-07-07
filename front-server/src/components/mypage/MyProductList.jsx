import React, { useEffect, useState } from "react";
import styles from "./MyProductList.module.css"; // 공통 스타일 재사용
import defaultImage from '/src/assets/images/imgIcon.png';
import amazonLogo from '/src/assets/images/amazon_logo.png';
import shopeeLogo from '/src/assets/images/shopee_logo.png';
import { useNavigate } from "react-router-dom";
import { getMyDomesticPosts } from "../../service/domesticPostApi";
import { getUserIdFromToken } from "../../util/jwt";
import { getMyForeignPosts } from "../../service/foreignPostApi";

const MyProductList = () => {
const [products, setProducts] = useState([]);
const navigate = useNavigate();

useEffect(() => {
    async function fetchProducts() {
        try {
            const userId = getUserIdFromToken();
            const [domestic, foreign] = await Promise.all([
                getMyDomesticPosts(userId),
                getMyForeignPosts(userId),
            ]);

            const domesticMapped = domestic.map(post => ({
                id: post.id,
                region: 'domestic',
                url: post.url,
                platform: post.platform,
                title: post.title,
                content: post.content,
                price: post.yourPrice,
                image: post.img || '',
            }));

            const foreignMapped = foreign.map(post => ({
                id: post.id,
                region: 'foreign',
                url: post.url,
                platform: post.platform,
                title: post.title,
                content: post.content,
                price: post.yourPrice,
                image: post.img || '',
            }));

            setProducts([...domesticMapped, ...foreignMapped].sort((a, b) => b.id - a.id));

        } catch (error) {
            console.error("❌ 상품 목록 조회 실패:", err);
        }
        
    }

fetchProducts();
}, []);

return (
<div className={styles.wrapper}>
    <div className={styles.headerRow}>
    <h2 className={styles.title}>내 상품 리스트</h2>
    </div>

    {products.length === 0 ? (
    <p className={styles.empty}>등록된 상품이 없습니다.</p>
    ) : (
    <div className={styles.grid}>
        {products.map((item) => (
        <div
            key={`${item.region}-${item.id}`}
            className={styles.card}
            onClick={() => navigate(`/product/${item.region}/${item.id}`, {
                state: {
                    product: item,
                    region: item.region,
                },
            })}
            style={{ cursor: "pointer" }}
        >
            <div className={styles.imageBox}>
            <img
                src={item.image || defaultImage}
                alt="대표 이미지"
                className={styles.previewImage}
            />
            </div>
            <div className={styles.textBox}>
            <p className={styles.productTitle}>{item.title || "제목 없음"}</p>
            <p className={styles.productPrice}>
                💰 {item.price
                    ? `${item.price}${item.region === 'foreign' ? '$' : '₩'}`
                    : item.region === 'foreign'
                    ? '10$'
                    : '1000₩'}
            </p>
            {/* <div className={styles.platformLabel}>
                {item.platform === "amazon" && (
                <>
                    <img src={amazonLogo} alt="Amazon" className={styles.platformIcon} />
                    <span>Amazon</span>
                </>
                )}
                {item.platform === "shopee" && (
                <>
                    <img src={shopeeLogo} alt="Shopee" className={styles.platformIcon} />
                    <span>Shopee</span>
                </>
                )}
                {!["amazon", "shopee"].includes(item.platform) && (
                <span>🌐 플랫폼 미지정</span>
                )}
            </div> */}
            <div className={styles.platformLabel}>
            {/* 기본 Amazon으로 처리 */}
            <img
                src={
                item.platform === "shopee"
                    ? shopeeLogo
                    : amazonLogo // 플랫폼이 없거나 잘못된 경우도 포함
                }
                alt={
                item.platform === "shopee"
                    ? "Shopee"
                    : "Amazon"
                }
                className={styles.platformIcon}
            />
            <span>
                {item.platform === "shopee" ? "Shopee" : "Amazon"}
            </span>
            </div>
            </div>
        </div>
        ))}
    </div>
    )}
</div>
);
};

export default MyProductList;
