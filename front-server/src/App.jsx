import { Route, Routes } from 'react-router-dom'
import './assets/styles/global.css'
import EmailSignUp from './pages/auth/EmailSignUp';
import Main from './pages/Main';
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';

function App() {

  return (
    <div className='global-container'>
      <Routes>
        <Route path='/' element={<Main/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/email_signup' element={<EmailSignUp/>}/>
      </Routes>
    </div>
  )
}

export default App
