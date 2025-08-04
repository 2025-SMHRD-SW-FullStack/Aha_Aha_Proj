import React, { useState } from 'react'
import styles from './Amazon.module.css'
import step1 from '/src/assets/images/amazon/step1.png'
import ImageModal from '../../chatbot/ImageModal';

const AmazonStep1 = () => {
    // 모달에 띄울 src 관리
    const [modalSrc, setModalSrc] = useState(null);

    return (
        <div>
            <h2>1단계: 셀러 센트럴 접속</h2>

            {/* 1. 회원가입 섹션 */}
            <div className={styles.infoBox}>
                <h4 style={{marginBottom:'10px'}}>회원가입이 되셨을까요?</h4>
                ① 계정이 없다면 <strong>[Sign up]</strong> 버튼을 클릭하여 셀러 계정을 생성<br/>
                <div>
                    <a className={styles.linkHover}
                    href="https://sellercentral.amazon.com/ap/register?clientContext=135-9752483-8258121&openid.pape.max_auth_age=0&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&language=en_US&pageId=sc_amazon_v3_unified&openid.return_to=https%3A%2F%2Fsellercentral.amazon.com%2Fhome&prevRID=4CKGR60PKXFVPD0VCM5C&openid.assoc_handle=sc_na_amazon_v2&openid.mode=checkid_setup&prepopulatedLoginId=&failedSignInCount=0&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0"
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                    🔗 Amazon 셀러 센트럴 회원가입 바로가기
                    </a>
                </div>
            </div>
            <br/>
            {/* 로그인 섹션 */}
            <div className={styles.infoBox}>
                ② <strong>아마존 셀러 센트럴</strong>에 접속 후 로그인<br/>
                <div>
                    <a className={styles.linkHover}
                    href="https://sellercentral.amazon.com/ap/signin?openid.pape.max_auth_age=0&openid.return_to=https%3A%2F%2Fsellercentral.amazon.com%2Fhome&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.assoc_handle=sc_na_amazon_v2&openid.mode=checkid_setup&language=ko_KR&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&pageId=sc_na_amazon_v2&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&ssoResponse=eyJ6aXAiOiJERUYiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiQTI1NktXIn0.-U_tHUv9xTgSkFEJn65MlkkCr_zJngOkSbLOq1sU7UO01bbWhHfbIA.KWyeNrqERdcFiRhn.LTQvDg97w0XxKWnaRM4zzEZkGFjnizoMqVrNNjBC7ASIGVJGYCH1heeZaFrgq0jh90mp7RDNU6wSWtNPa0CT4hAFkJZ37NbgzPxS0pHbDV05ddjRMAtU3GaWACAH48gyy4e3-m9TBsmBsA2A1UF5qal2dnW81IRUZwB2FsTpu-ZlzwOUG5aAhxwszxnFN18r73jb0w31lw.S8h6tfcQJNu3wfPBJo9-7g"
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                    🔗 Amazon 셀러 센트럴 로그인 바로가기
                    </a>
                </div>
                · 상단 메뉴에서 <strong>[Catalog]</strong> 클릭 후, <strong>[Add Products]</strong> 를 선택
            </div>
            <br/>
            <div style={{backgroundColor:'#feffb1', border:0}} className={styles.infoBox}>
                <strong>💡TIP</strong><br />
                <strong style={{marginLeft:'8px'}}>아마존 셀러 센트럴은 크롬 브라우저에서 가장 안정적으로 작동함</strong>
                
            </div>
            
            <br />
            <br />
            
            <h3>이미지 참고</h3>
            <div className={styles.imgBox}>
                {/* 클릭 시 이미지 확대 */}
                <img
                    src={step1}
                    alt="셀러 센트럴 접속"
                    style={{ maxWidth: '100%', marginTop: '16px', borderRadius: '8px' }}
                    onClick={() => setModalSrc(step1)}
                />
            </div>

            {/* 모달 렌더링 */}
            <ImageModal
                src={modalSrc}
                onClose={() => setModalSrc(null)}
            />
        </div>
    )
}

export default AmazonStep1