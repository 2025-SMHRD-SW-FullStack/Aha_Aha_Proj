import React, { useEffect, useRef, useState } from 'react'
import styles from './ItemDetail.module.css'
import searchIcon from '/src/assets/images/search.png'
import favoriteOnIcon from '/src/assets/images/favorite_on.png'
import favoriteOffIcon from '/src/assets/images/favorite_off.png'
import favoriteAddIcon from '/src/assets/images/favorite_add.png'
import favoriteDeleteIcon from '/src/assets/images/favorite_delete.png'


/** input, 즐겨찾기 버튼 등 중앙 검색 영역 전체 */
const ItemDetail = ({itemId}) => {
    const [inputValue, setInputValue] = useState(itemId);
    const inputRef = useRef(null);
    const spanRef = useRef(null); // 글자 길이 측정용 span

    const [isFavorite, setIsFavorite] = useState(false);
    const [feedback, setFeedback] = useState(null);

    const handleFavorite = () => {
        const nextState = !isFavorite
        setIsFavorite(nextState)

        if (nextState) {
            // 즐겨찾기 추가됐다는 알림창 표시
            setFeedback('add')
        } else {
            setFeedback('delete')
        }

        setTimeout(()=> setFeedback(null), 3000)
    };

    const feedbackIcon = feedback === 'add' ? favoriteAddIcon : favoriteDeleteIcon;

    // input 글자 수에 따라 width 자동 조절
    useEffect(() => {
        if (inputRef.current && spanRef.current) {
            const charLimit = 10;
            const displayText = inputValue || '품목을 입력해주세요.';
            spanRef.current.textContent = displayText;

            const spanWidth = spanRef.current.offsetWidth + 10;

            if (inputValue.length <= charLimit) {
                inputRef.current.style.width = `${spanWidth}px`;
            } else {
                inputRef.current.style.width = `300px`
            }
        }
    }, [inputValue]);

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

                        <img className={styles.searchIcon} src={searchIcon} alt='검색 아이콘' />
                    </div>
                    <button>수출하러 가기</button>
                </div>
                <hr/>
            </div>
            {/* <h1>{itemId}에 대한 수출 성공률 분석</h1> */}
        </div>
    )
}

export default ItemDetail