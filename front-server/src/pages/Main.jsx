import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import MainLayout from '/src/components/layouts/MainLayout'
import  styles from './Main.module.css'
import { Link } from 'react-router-dom'
import itemImg from '/src/assets/images/item.png'
import platformImg from '/src/assets/images/platform.png'
import chatbotImg from '/src/assets/images/chatbot.png'
import boardImg from '/src/assets/images/board.png'
import productImg from '/src/assets/images/product.png'


const Main = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        // if (!token) {
        //     alert("로그인이 필요합니다.");
        //     navigate("/login");
        // }
    }, [navigate]);

    const handleStartChatbot = () => {
        navigate("/test-steps");
    };

    return (
        <MainLayout>
            <div className={styles.wrapper}>
                <div className={styles.left}>
                    <div className={`${styles.box} ${styles.item}`}>
                        <Link to='/item'>
                            <h2>품목</h2>
                            <p>품목에 맞는 수출 국가와 성공 확률을 <br />추천해드립니다.</p>
                            <img src={itemImg} alt="품목 이미지" />
                        </Link>
                    </div>
                    <div className={`${styles.box} ${styles.platform}`}>
                        <Link to='/platform'>
                            <h2>중개플랫폼</h2>
                            <p>상품 판매 등록 방법을 단계별로<br /> 쉽게 안내해 드립니다.</p>
                            <img src={platformImg} alt="플랫폼 이미지" />
                        </Link>
                    </div>
                </div>
                
                {/* <div className={`${styles.box} ${styles.document}`}>
                    <Link to='/documents'>
                        <h2>내 문서함</h2>
                        <p>수출 시 필요한 서류들 모음함입니다.</p>
                        <img src={documentImg} alt="품목 이미지" />
                    </Link>
                </div> */}

                <div className={styles.right}>
                    <div className={`${styles.box} ${styles.board}`}>
                        <Link to='/exhibition'>
                            <h2>상품</h2>
                            <p>Amazon과 Shoppe에 등록한 <br />판매 제품들을 보여줍니다.</p>
                            <img src={productImg} alt="게시판 이미지" />
                        </Link>
                    </div>

                    <div className={`${styles.box} ${styles.chatbot}`}>
                        <Link to='/chatbot'>
                            <h2>챗봇 가이드</h2>
                            <p>품목 검색부터 수출 유망 국가 추천, <br />판매 등록 가이드, 게시글 작성<br />까지 한 번에!</p>
                            <img src={chatbotImg} alt="챗봇 이미지" />
                        </Link>
                    </div>
                </div>

            </div>
        </MainLayout>
    )
}

export default Main
