import React, { useEffect, useRef, useState } from 'react'
import styles from './ItemDetail.module.css'
import searchIcon from '/src/assets/images/search.png'
import favoriteOnIcon from '/src/assets/images/favorite_on.png'
import favoriteOffIcon from '/src/assets/images/favorite_off.png'
import favoriteAddIcon from '/src/assets/images/favorite_add.png'
import favoriteDeleteIcon from '/src/assets/images/favorite_delete.png'
import noResultIcon from '/src/assets/images/no_result.png'
import typingIcon from '/src/assets/images/typing.png'
import lodingIcon from '/src/assets/images/platform.png'
import { useNavigate } from 'react-router-dom'
import { getRecommendedCountries } from '../../service/recommendService'
import { getProductItemIdByName, toggleFavorite } from '../../service/favoriteService'
import { getUserIdFromToken } from '../../util/jwt'


/** input, 즐겨찾기 버튼 등 중앙 검색 영역 전체 */
const ItemDetail = ({itemId}) => {
    // 품목 입력값 변경에 따른 경로 변경
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState(itemId);
    const inputRef = useRef(null);
    const spanRef = useRef(null); // 글자 길이 측정용 span

    const [isFavorite, setIsFavorite] = useState(false);
    const [feedback, setFeedback] = useState(null);
    // const [favoriteList, setFavoriteList] = useState([]);
    const [searched, setSearched] = useState(false);

    const [recommendData, setRecommendData] = useState(null);
    const [loading, setLoading] = useState(false);
    // const [platformMap, setPlatformMap] = useState({}); // 국가명 -> 플랫폼 목록

    // 해당 유저 Id 불러오기
    const userId = localStorage.getItem('userId');

    // input 자동 포커스
    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    // itemId 변경될 때 input도 동기화
    useEffect(() => {
        if (itemId) {
            setInputValue(itemId);
            runSearch(itemId); // 처음 URL에서 들어온 경우 검색된 상태로 간주
        } else {
            setInputValue('');
            setRecommendData(null); // 결과 초기화
            setSearched(false);
        }
    }, [itemId]);

    // 입력값이 바뀔 때 즐겨찾기 여부 서버에서 확인하는 로직을 추가하고 싶다면 여기에 API 호출 필요
    // 로컬스토리지에서 해당 유저의 즐겨찾기 목록 불러오기
    // useEffect(() => {
    //     if (!userId) return;
    //     try {
    //         const saved = JSON.parse(localStorage.getItem(`favorites_${userId}`)) || [];
    //         setFavoriteList(saved);
    //     } catch (e) {
    //         console.error('즐겨찾기 목록 파싱 실패', e);
    //         setFavoriteList([]);
    //     }
    // }, [itemId, userId]);

    // 입력값이 바뀔 때마다 즐겨찾기 여부 동기화
    // useEffect(() => {
    //     if (!userId) return;
    //     const trimmed = inputValue.trim();
    //     setIsFavorite(favoriteList.includes(trimmed));
    // }, [inputValue, favoriteList, userId]);

    // 검색 완료 후 플랫폼 추천 요청
    // useEffect(() => {
    //     if (!recommendData?.tableData) return;

    //     recommendData.tableData.forEach((item) => {
    //         fetchPlatformForCountry(item.country); // 비동기로 각 국가별 플랫폼 요청
    //     });
    // }, [recommendData]);

    
    // 검색 상태 초기화 로직 추가 (입력 중일 때 상태 전환)
    useEffect(() => {
        if (inputValue.trim() !== itemId) {
            setSearched(false);
            setRecommendData(null);
        }
    }, [inputValue, itemId]);

    /** [ 즐겨찾기 버튼 클릭 (서버에 요청)] */
    const handleFavorite = async () => {
        const userId = getUserIdFromToken();

        if (!userId) {
            alert('로그인이 필요합니다.');
            return;
        }

        const trimmed = inputValue.trim();
        try {
            const productItemId = await getProductItemIdByName(trimmed); // 품목 ID 가져오기
            await toggleFavorite({productItemId, userId}); // 서버에 즐겨찾기 토글 요청

            const nextState = !isFavorite;
            setIsFavorite(nextState);
            setFeedback(nextState ? 'add': 'delete');
            setTimeout(()=> setFeedback(null), 1000);
        } catch (error) {
            console.error('즐겨찾기 처리 실패:', error);
        }

        // const updatedList = nextState
        // ? [...favoriteList, trimmed]
        // : favoriteList.filter(item => item !== trimmed);

        // setFavoriteList(updatedList);
        // localStorage.setItem(`favorites_${userId}`, JSON.stringify(updatedList));

        // // 즐겨찾기 추가/삭제 클릭 알림 표시
        // setFeedback(nextState ? 'add' : 'delete');
        // setTimeout(()=> setFeedback(null), 1000);
    };

    /** [ 검색 실행 ] */
    const runSearch = async (keyword) => {
        const trimmed = inputValue.trim();
        if (!trimmed) {
            setSearched(true); // 공백이어도 표시 메시지를 위해 true
            return;
        }

        setSearched(true);
        setLoading(true);
    
        try {
            const data = await getRecommendedCountries(trimmed);
            setRecommendData(data);
        } catch (error) {
            console.error('API 추천 데이터 오류', error);
            setRecommendData(null);
        } finally {
            setLoading(false);
        }
    }

    /** 특정 국가에 대해 플랫폼을 가져와 저장 */
    // const fetchPlatformForCountry = async (country) => {
    //     if (platformMap[country]) return; // 이미 있음

    //     try {
    //         const data = await getRecommendedPlatformByCountry(country);
    //         setPlatformMap((prev) => ({ ...prev, [country]: data }));

    //     } catch (error) {
    //         console.error(`플랫폼 추천 불러오기 실패 (${country})`, error);
    //         setPlatformMap((prev) => ({ ...prev, [country]: [] }));
    //     }
    // }

    /** [ 품목 검색 ] */
    const handleSearch = () => {
        const trimmed = inputValue.trim();
        
        if (trimmed !== itemId) {
            navigate(`/item/${encodeURIComponent(trimmed)}`);
        } else {
            runSearch(trimmed); // 페이지 이동 없이 같은 품목에서 재검색 가능
        }
    };

    /** [ 엔터키로 검색 실행 ] */
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSearch();
    };

    const feedbackIcon = feedback === 'add' ? favoriteAddIcon : favoriteDeleteIcon;

    // input 글자 수에 따라 width 자동 조절
    useEffect(() => {
        if (!inputRef.current || !spanRef.current) return;
    
        const charLimit = 10;
        const displayText = inputValue || '품목을 입력해주세요.';
        spanRef.current.textContent = displayText;
    
        const spanWidth = spanRef.current.offsetWidth + 10;
    
        inputRef.current.style.width =
            inputValue.length <= charLimit ? `${spanWidth}px` : '300px';
    
    }, [inputValue]);

    const goToPlatform = () => {
        navigate('/platform');
    }

    /** 렌더링 분기 코드 정리 */
    const renderContent = () => {
        const trimmed = inputValue.trim();

        if (trimmed === '') {
            return (
                <div className={styles.noDataMessage}>
                    <img className={styles.noResultIcon} src={noResultIcon} alt="검색 결과 없음" />
                    <p className={`${styles.typingText}`}>❗ 품목을 입력해주세요.</p>
                </div>
            );
        }

        if (!searched) {
            return (
                <div className={styles.noDataMessage}>
                    <img className={styles.noResultIcon} src={typingIcon} alt="입력 중 아이콘" />
                    <p className={`${styles.typingText} ${styles.typingDots}`}>⌨️ 입력 중 ...</p>
                </div>
            );
        }

        if (loading) {
            return (
                <div className={styles.noDataMessage}>
                    <div className={styles.spinWrapper}>
                        <img className={`${styles.noResultIcon}`} src={lodingIcon} alt="로딩 아이콘" />
                    </div>
                    <p className={`${styles.typingText} ${styles.typingDots}`}>⏳ 추천 국가 정보를 불러오는 중입니다 ...</p>
                </div>
            );
        }

        if (recommendData?.tableData?.length > 0) {
            return (
                <table className={styles.exportTable}>
                    <thead>
                        <tr>
                            <th>순위</th>
                            <th>국가</th>
                            <th>예상성공률</th>
                            <th></th>
                            {/* <th>추천 이커머스</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {recommendData.tableData.map((item, idx) => (
                            <tr key={idx}>
                                <td>{item.rank}</td>
                                <td>{item.country}</td>
                                <td>{item.recommendationScore}</td>
                                <td className={styles.descriptionTable}>
                                    <div className={styles.description}>
                                    {item.key_factor}
                                    </div>
                                </td>
                                {/* <td>{
                                    platformMap[item.country]
                                        ? platformMap[item.country].map(p => p.platform).join(', ')
                                        : '불러오는 중...'}
                                </td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
        }
        
        return (
            <div className={styles.noDataMessage}>
                <img className={styles.noResultIcon} src={noResultIcon} alt="검색 결과 없음" />
                <p>❗ 해당 품목에 대한 수출 유망 국가 정보가 없습니다.</p>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.searchBox}>
                <hr/>
                <div className={styles.itemBox}>
                    <div className={styles.centerBox}>
                        <div className={styles.iconBox}>
                            <img onClick={handleFavorite} src={isFavorite ? favoriteOnIcon : favoriteOffIcon} alt='즐겨찾기 아이콘' />
                            {/* 피드백 표시 */}
                            {feedback && (
                                <div className={styles.feedbackBox}>
                                    <img src={feedbackIcon} alt="추가/삭제 알림" />
                                </div>
                            )}
                        </div>

                        {/* 입력창 + 숨겨진 span */}
                        <div style={{position: 'relative'}}>
                            <input 
                                ref={inputRef}
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder='품목을 입력해주세요.'
                                style={{
                                    maxWidth: '100%',
                                    fontSize: '23px',
                                    textAlign: 'center',
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap'
                                }} />
                            <span
                                ref={spanRef}
                                style={{
                                    position: 'absolute',
                                    visibility: 'hidden',
                                    whiteSpace: 'pre',
                                    fontSize: '23px',
                                    fontFamily: 'inherit',
                                }}/>
                        </div>

                        <img className={styles.searchIcon} 
                            src={searchIcon} 
                            alt='검색 아이콘' 
                            onClick={handleSearch}
                        />
                    </div>
                    <button onClick={goToPlatform}>수출하러 가기</button>
                </div>
                <hr/>
            </div>

            {/* 수출 유망국가 TOP 20 */}
            <div className={styles.scrollableTableWrapper}>
                {renderContent()}
            </div>
        </div>
    )
}

export default ItemDetail