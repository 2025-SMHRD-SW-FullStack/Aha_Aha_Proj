import React, { useEffect, useState } from 'react'
import styles from './ProductDetail.module.css'
import defaultImage from '/src/assets/images/imgIcon.png';
import amazonLogo from '/src/assets/images/amazon_logo.png';
import shopeeLogo from '/src/assets/images/shopee_logo.png';

const ProductDetail = ({product, onBack, region, onSaveUrl}) => {
    const {username} = product;
    const isDomestic = region === 'domestic';

    const title = product.title;
    const content = product.content;
    
    const priceText = product.price
        ? `${product.price}${isDomestic ? '₩' : '$'}`
        : isDomestic
        ? `1000₩`
        : `10$`;
    
    const platform = product.platform || 'amazon';

    const {url} = product;

    // URL 편집 모드 상태
    const [isEditing, setIsEditing] = useState(false)
    const [urlInput, setUrlInput] = useState(url || '')

    // product.url이 바뀔 때마다 urlInput도 초기화
    useEffect(() => {
        setUrlInput(url || '');
    }, [url])

    const handleTitleButton = (e) => {
        e.stopPropagation();
        if (isEditing) {
            console.log('📝 ProductDetail: calling onSaveUrl with', urlInput.trim());
            onSaveUrl(urlInput.trim()); // 빈 값도 저장되도록 조건 삭제
            setIsEditing(false);
        } else {
            setUrlInput(url || '');
            setIsEditing(true);
        }
    };

    const handleCancel = (e) => {
    e.stopPropagation()
    setUrlInput(url || '')
    setIsEditing(false)
    }

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
                        {/* <h2 className={styles.title}>{title || '제목 없음'}</h2> */}

                        <div className={styles.titleRow}>
                            <h2 className={styles.title}>{title || '제목 없음'}</h2>
                            <div>
                                <button 
                                    className={styles.editButtonTitle} 
                                    onClick={handleTitleButton}
                                >
                                    {isEditing ? '수정 완료' : '수정'}
                                </button>
                                {isEditing && (
                                    <button
                                    className={styles.cancelButton}
                                    onClick={handleCancel}
                                    >
                                    취소
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* 여기에 작성자 닉네임 표시 */}
                        {username && (
                        <div className={styles.username}>
                            by {username}
                        </div>
                        )}

                        <p className={styles.price}>💰 {priceText}</p>
                        <p className={styles.content}>{content || '상품 설명이 없습니다.'}</p>
                    </div>

                    {isEditing ? (
                    <input
                        type="text"
                        value={urlInput}
                        onChange={(e) => setUrlInput(e.target.value)}
                        placeholder="상품 URL 입력"
                        className={styles.urlInput}
                    />
                    ):(
                    // <div className={styles.platformBox}>
                    <div className={`${styles.platformBox} ${url ? styles.platformBoxActive : ''}`}>
                        <div className={styles.platform}>
                                {platform === 'amazon' && (
                                <>
                                    <img src={amazonLogo} alt="Amazon" />
                                    <span>Amazon</span>
                                </>
                                )}
                                {platform === 'shopee' && (
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
                    )}


                </div>
            </div>
        </div>
    );
}

export default ProductDetail