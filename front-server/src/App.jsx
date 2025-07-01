import { Route, Routes } from 'react-router-dom'
import './assets/styles/global.css'
import EmailSignUp from './pages/auth/EmailSignUp';
import Main from './pages/Main';
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import EmailVerifiedHandler from './components/auth/EmailVerifiedHandler';
import OAuthSuccess from './pages/auth/OAuthSuccess';
import SlideChatBot from './pages/SlideChatBot';
import TestSteps from './pages/TestSteps';

function App() {
  return (
    <div className='global-container'>
      <Routes>
        <Route path='/' element={<Main/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/email_signup' element={<EmailSignUp/>}/>
        <Route path='/email-verified' element={<EmailVerifiedHandler/>}/>
        <Route path='/oauth-success' element={<OAuthSuccess/>}/>
        <Route path="/slide-chat" element={<SlideChatBot/>} />
        <Route path="/test-steps" element={<TestSteps />} /> {/* ✅ 테스트용 경로 */}
      </Routes>
    </div>
  )
}

export default App;
