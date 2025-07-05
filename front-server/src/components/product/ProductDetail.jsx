import React from 'react'
import styles from './ProductDetail.module.css'
import defaultImage from '/src/assets/images/imgIcon.png';
import amazonLogo from '/src/assets/images/amazon_logo.png';
import shopeeLogo from '/src/assets/images/shopee_logo.png';

const ProductDetail = ({product, onBack}) => {

    return (
        <div className={styles.wrapper}>
            <button className={styles.backButton} onClick={onBack}>← 돌아가기</button>

            <div className={styles.card}>
                <div className={styles.imageBox}>
                <img
                    src={product.image || defaultImage}
                    alt="대표 이미지"
                    className={styles.previewImage}
                />
                </div>

                <div className={styles.contentBox}>
                    <div className={styles.textBox}>
                        <h2 className={styles.title}>{product.title || '제목 없음'}</h2>

                        <p className={styles.price}>💰 {product.price ? `${product.price}₩` : '가격 정보 없음'}</p>
                        <p className={styles.content}>{product.content || '상품 설명이 없습니다.'}</p>
                    </div>

                    <div className={styles.platformBox}>
                        <div className={styles.platform}>
                                {product.platform === 'amazon' && (
                                <>
                                    <img src={amazonLogo} alt="Amazon" />
                                    <span>Amazon</span>
                                </>
                                )}
                                {product.platform === 'shopee' && (
                                <>
                                    <img src={shopeeLogo} alt="Shopee" />
                                    <span>Shopee</span>
                                </>
                                )}
                            <div className={styles.btnBox}>
                                {product.url ? (
                                    <a
                                    href={product.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.linkButton}
                                    >
                                    상품 보러 가기
                                    </a>
                                ) : (
                                    <div className={styles.disabledButton}>🕓 승인 대기 중</div>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail