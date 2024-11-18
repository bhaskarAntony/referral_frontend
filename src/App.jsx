import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import Header from './components/header/Header'
import './App.css'
import Footer from './components/footer/Footer'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import ReferralForm from './user/ReferralForm'
import Profile from './pages/profile/Profile'
import Otp from './user/Otp'

function App() {
  return (
    <div className=''>
      <BrowserRouter>
      <Header/>
      <Routes>
       <Route path='/' element={<PrivateRoute><Home/></PrivateRoute>}/>
       <Route path='/login' element={<Login/>}/>
       <Route path='/register' element={<Register/>}/>
       <Route path="/enroll/course/:referralId" element={<ReferralForm />} />
       <Route path="/profile" element={<Profile />} />
       <Route path="/verify/otp" element={<Otp />} />
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  )
}

export default App