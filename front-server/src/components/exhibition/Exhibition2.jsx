import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getUserIdFromToken } from './../../util/jwt';
import { getMyDomesticPosts } from '../../service/domesticPostApi';
import { getMyForeignPosts } from '../../service/foreignPostApi';
import styles from './Exhibition2.module.css'
import defaultImage from '/src/assets/images/imgIcon.png'
import amazonLogo   from '/src/assets/images/amazon_logo.png'
import shopeeLogo   from '/src/assets/images/shopee_logo.png'

const Exhibition2 = () => {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchAllPosts() {
            const userId = getUserIdFromToken();

            try {
                // 국내 게시글 가져오기
                const domesticPosts  = await getMyDomesticPosts(userId) || []; 
                // 해외 게시글 가져오기
                const foreignPosts = await getMyForeignPosts(userId) || [];

                // 데이터 합치기 (해외 게시글에 구분을 위해 별도 필드 추가도 가능)
                const combinedPosts = [
                    ...domesticPosts.map(post => ({ ...post, region: 'domestic' })),
                    ...foreignPosts.map(post => ({ ...post, region: 'foreign' })),
                ];

                console.log('🎯 합친 게시글 데이터:', combinedPosts);

                setPosts(combinedPosts)
            } catch (err) {
                console.error('내 게시글 불러오기 실패:', err)
            }
    }
        fetchAllPosts()
    }, [])

    return (
    <div className={styles.wrapper}>
        {posts.length === 0 ? (
        <p className={styles.empty}>등록된 상품이 없습니다.</p>
        ) : (
        <div className={styles.grid}>
            {posts.map(post => (
            <div
                key={`${post.region}-${post.id}`}
                className={styles.card}
                onClick={() => navigate(`/product/${post.region}/${post.id}`, { state: { product: post } })}
            >
                <div className={styles.imageBox}>
                {post.img ? (
                    <img src={post.img} alt={post.title} className={styles.previewImage}/>
                ) : (
                    <img src={defaultImage} alt="기본 이미지" className={styles.previewImage}/>
                )}
                </div>
                <div className={styles.textBox}>
                <p className={styles.productTitle}>{post.title}</p>
                <p className={styles.productPrice}>
                💰 {post.yourPrice
                        ? `${post.yourPrice}${post.region === 'domestic' ? '₩' : '$'}`
                        : post.region === 'domestic'
                        ? '1000₩'
                        : '10.25$'}
                </p>
                <div className={styles.platformLabel}>
                    {post.platform === 'amazon' ? (
                    <>
                        <img src={amazonLogo} alt="Amazon" className={styles.platformIcon}/>
                        <span>Amazon</span>
                    </>
                    ) : post.platform === 'shopee' ? (
                    <>
                        <img src={shopeeLogo} alt="Shopee" className={styles.platformIcon}/>
                        <span>Shopee</span>
                    </>
                    ) : (
                        <>
                            <img src={amazonLogo} alt="Amazon" className={styles.platformIcon} />
                            <span>Amazon</span>
                        </>
                    // <span>🌐 플랫폼 미지정</span>
                    )}
                </div>
                </div>
            </div>
            ))}
        </div>
        )}
    </div>
    )
}

export default Exhibition2