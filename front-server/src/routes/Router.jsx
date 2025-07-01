import { BrowserRouter, Route, Routes } from "react-router-dom";
import '/src/assets/styles/global.css'
import EmailSignUp from '/src/pages/auth/EmailSignUp';
import Main from '/src/pages/Main';
import Login from '/src/pages/auth/Login';
import SignUp from '/src/pages/auth/SignUp';
import EmailVerifiedHandler from '/src/pages/auth/EmailVerifiedHandler';
import OAuthSuccess from '/src/pages/auth/OAuthSuccess';
import ItemPage from '/src/pages/item/ItemPage';
import PlatformPage from '/src/pages/platform/PlatformPage';
import BoardPage from '/src/pages/board/BoardPage';
import ChatbotPage from '/src/pages/chatbot/ChatbotPage';
import ItemDetailPage from '/src/pages/item/ItemDetailPage';


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
                <Route path='/board' element={<BoardPage/>}/>

                {/* 중개플랫폼 페이지 관련 */}
                <Route path='/platform' element={<PlatformPage/>}/>

                {/* 챗봇 페이지 관련 */}
                <Route path='/chatbot' element={<ChatbotPage/>}/>
            </Routes>    
        </BrowserRouter>
    )

}

export default Router;