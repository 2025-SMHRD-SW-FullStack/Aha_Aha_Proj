// src/pages/Main.jsx
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import MainLayout from '../components/layouts/MainLayout'

const Main = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            alert("로그인이 필요합니다.");
            navigate("/login");
        }
    }, [navigate]);

    const handleStartChatbot = () => {
        navigate("/test-steps");
    };

    return (
        <MainLayout>
            <div style={{ padding: "2rem", textAlign: "center" }}>
                <h1>🌍 GlobalGo에 오신 것을 환영합니다!</h1>
                <p>AI 챗봇과 함께 수출을 준비해보세요.</p>
                <button
                    onClick={handleStartChatbot}
                    style={{
                        marginTop: "2rem",
                        padding: "1rem 2rem",
                        fontSize: "1.2rem",
                        backgroundColor: "#007bff",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer"
                    }}
                >
                    🚀 슬라이드 챗봇 시작하기
                </button>
            </div>
        </MainLayout>
    )
}

export default Main
