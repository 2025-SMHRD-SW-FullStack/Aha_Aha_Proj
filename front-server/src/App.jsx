import { Route, Routes } from 'react-router-dom'
import './assets/styles/global.css'
import EmailSignUp from './pages/auth/EmailSignUp';
import Main from './pages/Main';
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import EmailVerifiedHandler from './components/auth/EmailVerifiedHandler';
import OAuthSuccess from './pages/auth/OAuthSuccess';

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
      </Routes>
    </div>
  )
}

export default App
