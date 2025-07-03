import { BrowserRouter, Route, Routes } from "react-router-dom";
import '/src/assets/styles/global.css'
import EmailSignUp from '/src/pages/auth/EmailSignUpPage';
import Main from '/src/pages/Main';
import Login from '/src/pages/auth/LoginPage';
import SignUp from '/src/pages/auth/SignUpPage';
import EmailVerifiedHandler from '/src/pages/auth/EmailVerifiedHandler';
import OAuthSuccess from '/src/pages/auth/OAuthSuccess';
import ItemPage from '/src/pages/item/ItemPage';
import PlatformPage from '/src/pages/platform/PlatformPage';
import ChatbotPage from '/src/pages/chatbot/ChatbotPage';
import ItemDetailPage from '/src/pages/item/ItemDetailPage';
import ExhibitionPage from "../pages/exhibition/ExhibitionPage";


const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* 메인 */}
                <Route path='/' element={<Main/>}/>

                {/* 로그인 / 회원가입 관련 */}
                <Route path='/login' element={<Login/>}/>
                <Route path='/signup' element={<SignUp/>}/>
                <Route path='/email_signup' element={<EmailSignUp/>}/>

                {/* 이메일 인증 관련 */}
                <Route path='/email-verified' element={<EmailVerifiedHandler/>}/>
                <Route path='/oauth-success' element={<OAuthSuccess/>}/>

                {/* 품목 페이지 관련 */}
                <Route path='/item' element={<ItemPage/>}/>
                <Route path='/item/:itemId' element={<ItemDetailPage/>}/>

                {/* 게시판 페이지 관련 */}
                <Route path='/exhibition' element={<ExhibitionPage/>}/>

                {/* 중개플랫폼 페이지 관련 */}
                <Route path='/platform' element={<PlatformPage/>}/>

                {/* 챗봇 페이지 관련 */}
                <Route path='/chatbot' element={<ChatbotPage/>}/>
            </Routes>    
        </BrowserRouter>
    )

}

export default Router;