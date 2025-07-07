import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import searchIcon from '/src/assets/images/search.png'
import leftArrow from '/src/assets/images/leftArrow.png'
import rightArrow from '/src/assets/images/rightArrow.png'
import boxIcon from '/src/assets/images/boxIcon.png'
import styles from './Item.module.css'

const Item = () => {
    const [inputValue, setInputValue] = useState('');
    const navigate = useNavigate();
    const inputRef = useRef(null);
    const spanRef = useRef(null); // 글자 길이 측정용 span
    const scrollRef = useRef(null); // 슬라이드 영역

    const recommendedItems = ['추천 품목1', '추천 품목2', '추천 품목3', '추천 품목4', '추천 품목5', '추천 품목6'];
    const [startIndex, setStartIndex] = useState(0);
    const ITEMS_TO_SHOW = 4;

    const handleSearch = () => {
        if (inputValue.trim() !== '') {
            navigate(`/item/${encodeURIComponent(inputValue.trim())}`);
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSearch();
    }

    const handleSlide = (direction) => {
        const total = recommendedItems.length;
        const nextIndex = direction === 'left'
            ? (startIndex - 1 + total) % total
            : (startIndex + 1) % total;
        setStartIndex(nextIndex);
    };

    // input 글자 수에 따라 width 자동 조절
    useEffect(() => {
        if (inputRef.current && spanRef.current) {
            const charLimit = 10;
            const displayText = inputValue || '품목을 입력해주세요.';
            spanRef.current.textContent = displayText;

            const spanWidth = spanRef.current.offsetWidth + 10;

            inputRef.current.style.width =
                inputValue.length <= charLimit ? `${spanWidth}px` : '300px';
        }
    }, [inputValue]);

     // 추천 품목 슬라이스 계산
    const visibleItems = Array.from({ length: ITEMS_TO_SHOW }, (_, i) =>
        recommendedItems[(startIndex + i) % recommendedItems.length]
    );

    return (
        <div className={styles.container}>
            <div className={styles.searchBox}>
                <hr/>
                <div className={styles.itemBox}>
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
                            }}
                        />
                        <span
                            ref={spanRef}
                            style={{
                                position: 'absolute',
                                visibility: 'hidden',
                                whiteSpace: 'pre',
                                fontSize: '23px',
                                fontFamily: 'inherit'
                            }}/>
                    </div>
                    <img onClick={handleSearch} src={searchIcon} alt='검색 아이콘'/>
                </div>
                <hr/>
            </div>

            {/* 추천 품목 슬라이드 영역 */}
            <div className={styles.sliderWrapper}>
                <button onClick={() => handleSlide('left')} className={styles.arrowBtn}>
                    <img src={leftArrow} alt="이전" />
                </button>
                <div className={styles.slider} ref={scrollRef}>
                    {visibleItems.map((item, index) => (
                        <div key={index} className={styles.slideItem}>
                            <img className={styles.boxImgBox} src={boxIcon} alt="아이콘" />
                            <p>{item}</p>
                        </div>
                    ))}
                </div>
                <button onClick={() => handleSlide('right')} className={styles.arrowBtn}>
                    <img src={rightArrow} alt="다음" />
                </button>
            </div>
        </div>
    )
}

export default Item