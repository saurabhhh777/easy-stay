import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Register from './Components/Register'
import VerifyEmail from './Components/VerifyEmail'
import Login from './Components/Login'
import Home from './Components/Home'
import ProtectedRoute from './Components/ProtectedRoute'
import ForgotPassword from './Components/ForgotPassword'
import ResetPassword from './Components/ResetPassword'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element = {<Register />}/>
        <Route path='/verify-email' element = {<VerifyEmail />}/>
        <Route path='/login' element = {<Login />}/>
        <Route path='/home' element = {<ProtectedRoute><Home /></ProtectedRoute>}/>
        <Route path='/forgot-password' element = {<ForgotPassword />}/>
        <Route path='/reset-password/:token' element = {<ResetPassword />}/>
      </Routes>
    </div>
  )
}

export default App
