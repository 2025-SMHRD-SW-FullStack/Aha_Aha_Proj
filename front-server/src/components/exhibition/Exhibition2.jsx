import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getUserIdFromToken } from './../../util/jwt';
import { getMyDomesticPosts } from '../../service/domesticPostApi';
import { getMyForeignPosts } from '../../service/foreignPostApi';
import styles from './Exhibition2.module.css'
import defaultImage from '/src/assets/images/imgIcon.png'
import amazonLogo   from '/src/assets/images/amazon_logo.png'
import shopeeLogo   from '/src/assets/images/shopee_logo.png'
import ko from '/src/assets/images/ko.png'
import en from '/src/assets/images/en.png'

const Exhibition2 = () => {
    const [domesticPosts, setDomesticPosts] = useState([]);
    const [foreignPosts, setForeignPosts] = useState([]);
    // const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filterRegion, setFilterRegion] = useState('') // '' = 전체, 'domestic', 'foreign'
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchAllPosts() {
            setIsLoading(true);
            setError(null);

            const userId = getUserIdFromToken();

            try {
                // 국내 게시글 가져오기
                // const domesticPosts  = await getMyDomesticPosts(userId) || []; 
                // 해외 게시글 가져오기
                // const foreignPosts = await getMyForeignPosts(userId) || [];

                // const [domesticPosts = [], foreignPosts = []] = await Promise.all([
                //     getMyDomesticPosts(userId),
                //     getMyForeignPosts(userId),
                // ]);

                // // 데이터 합치기 (해외 게시글에 구분을 위해 별도 필드 추가도 가능)
                // const combined = [
                //     ...domesticPosts.map(post => ({ ...post, region: 'domestic' })),
                //     ...foreignPosts.map(post => ({ ...post, region: 'foreign' })),
                // ];

                // setPosts(combined);
                // console.log('🎯 합친 게시글 데이터:', combined);

                const [dom = [], forn = []] = await Promise.all([
                    getMyDomesticPosts(userId),
                    getMyForeignPosts(userId),
                ]);
                // 각 post에 region 필드 추가
                setDomesticPosts(dom.map(p => ({...p, region: 'domestic'})))
                setForeignPosts(forn.map(p => ({...p, region: 'foreign'})))

            } catch (err) {
                console.error('내 게시글 불러오기 실패:', err)
                setError('게시글을 불러오는 중 오류가 발생했습니다.')
            } finally {
                setIsLoading(false);
            }
    }
        fetchAllPosts()
    }, []);

    // 필터링 : filterRegion 값이 있으면 해당 region만, 없으면 전체
    // const visiblePosts = filterRegion
    //     ? posts.filter(post => post.region === filterRegion)
    //     : posts;
    const visiblePosts = filterRegion === 'domestic'
        ? domesticPosts
        : filterRegion === 'foreign'
            ? foreignPosts
            : [...domesticPosts, ...foreignPosts]

    if (isLoading) return <p>로딩 중...</p>
    if (error) return <p className={styles.error}>{error}</p>

    return (
    <div className={styles.wrapper}>
        {/* 언어(Region) 선택 */}
        <div className={styles.filterBar}>
            <button
                className={!filterRegion ? styles.active : ''}
                onClick={() => setFilterRegion('')}
            >
            전체
            </button>
            <button
                className={filterRegion === 'domestic' ? styles.active : ''}
                onClick={() => setFilterRegion('domestic')}
            >
            <img src={ko} alt="KO" className={styles.icon} /> KO
            </button>
            <button
                className={filterRegion === 'foreign' ? styles.active : ''}
                onClick={() => setFilterRegion('foreign')}
            >
            <img src={en} alt="EN" className={styles.icon} /> EN
            </button>
        </div>

        {visiblePosts.length === 0 ? (
        <p className={styles.empty}>등록된 상품이 없습니다.</p>
        ) : (
        <div className={styles.grid}>
            {visiblePosts.map(post => (
            <div
                key={`${post.region}-${post.id}`}
                className={styles.card}
                onClick={() => 
                    navigate(
                        `/product/${post.region}/${post.id}`, 
                        { state: { product: post, region: post.region } })}
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
                        : '10$'}
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