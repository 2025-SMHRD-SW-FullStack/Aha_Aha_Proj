import React, { useState } from 'react'
import styles from './Platform.module.css'
import StepContent from './StepContent';
import amazonLogo from '/src/assets/images/amazon_logo.png'
import shopeeLogo from '/src/assets/images/shopee_logo.png'
import toggleIcon from '/src/assets/images/toggle_close.png'
import { FaBook } from 'react-icons/fa'

const Platform = () => {
    const sidebarData = {
        amazon: {
            label: '아마존',
            image: amazonLogo,
            steps: [
                { id: 'amazon_step1', label: '1단계 : 셀러 센트럴 접속' },
                { id: 'amazon_step2', label: '2단계 : 상품 검색 / 신규 등록' },
                { id: 'amazon_step3', label: '3단계 : 카테고리 선택' },
                { id: 'amazon_step4', label: '4단계 : 상품 정보 입력' },
                { id: 'amazon_step5', label: '5단계 : 리스팅 완료' }
            ]
        },
        shopee: {
            label: '쇼피',
            image: shopeeLogo,
            steps: [
                { id: 'shopee_step1', label: '1단계 : 셀러센터 로그인' },
                { id: 'shopee_step2', label: '2단계 : Global SKU 등록' },
                { id: 'shopee_step3', label: '3단계 : 기본정보 입력' },
                { id: 'shopee_step4', label: '4단계 : 판매정보 입력' },
                { id: 'shopee_step5', label: '5단계 : 무게 및 배송 정보 입력' },
                { id: 'shopee_step6', label: '6단계 : 상품 게시' },
            ]
        }
    }

    const [openPlatforms, setOpenPlatforms] = useState([]);
    const [selectedPlatform, setSelectedPlatform] = useState('');
    const [selectedStep, setSelectedStep] = useState('');

    const handleToggle = (platform) => {
        if (openPlatforms.includes(platform)) {
            setOpenPlatforms(openPlatforms.filter(p => p !== platform)); // 제거
        } else {
            setOpenPlatforms([...openPlatforms, platform]);
        }
    }

    return (
        <div className={styles.container}>
            {/* 왼쪽 사이드바 */}
            <aside className={styles.sidebar}>
                <h2 className={styles.sidebarTitle}>
                    <FaBook style={{marginRight: '13px', marginTop: '5px', color:'var(--color-primary)'}}/>
                    판매 등록 가이드
                </h2>
                <nav>
                    {Object.entries(sidebarData).map(([key, value]) => (
                        <div key={key} className={styles.platformBlock}>
                            <button
                                className={styles.platformBtn}
                                onClick={() => {
                                    handleToggle(key);
                                    setSelectedPlatform(key);
                                }}
                            >
                                <div className={styles.left}>
                                    <img
                                        src={value.image}
                                        alt={value.label}
                                        className={styles.platformIcon}
                                    />
                                    <span className={styles.platformLabel}>
                                        {value.label}
                                    </span>
                                </div>
                                <img
                                    src={toggleIcon}
                                    alt={openPlatforms.includes(key) ? '접기' : '펼치기'}
                                    className={`${styles.toggleIcon} ${openPlatforms.includes(key) ? styles.open : ''}`}
                                />
                            </button>
                            {openPlatforms.includes(key) && (
                                <ul className={styles.stepList}>
                                    {value.steps.map((step) => (
                                        <li
                                            key={step.id}
                                            className={`${styles.stepItem} ${selectedStep === step.id ? styles.activeStep : ''}`}
                                            onClick={() => setSelectedStep(step.id)}
                                        >
                                            {step.label}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </nav>
            </aside>

            {/* 오른쪽 콘텐츠 영역 */}
            <main className={styles.content}>
                <StepContent
                    platform={selectedPlatform}
                    selectedStep={selectedStep}
                />
            </main>
        </div>
    )
}

export default Platform