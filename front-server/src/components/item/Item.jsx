import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import searchIcon from '/src/assets/images/search.png'
import styles from './Item.module.css'

const Item = () => {
    const [inputValue, setInputValue] = useState('');
    const navigate = useNavigate();
    const inputRef = useRef(null);
    const spanRef = useRef(null); // 글자 길이 측정용 span

    const handleSearch = () => {
        if (inputValue.trim() !== '') {
            navigate(`/item/${encodeURIComponent(inputValue.trim())}`);
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSearch();
    }

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
        </div>
    )
}

export default Item