import React from 'react'
import copyBtn from '/src/assets/images/copyBtn.png'

const CopyButton = ({ text }) => {
    const handleCopy = () => {
        if (!text) return
        navigator.clipboard.writeText(text)
        .then(() => alert('클립보드에 복사되었습니다!'))
        .catch(() => alert('복사에 실패했습니다.'))
    }

    return (
        <button type="button" className="copyBtn" onClick={handleCopy}>
        <img style={{height:'30px'}} src={copyBtn} alt="복사하기 버튼" />
        </button>
    )
}

export default CopyButton
