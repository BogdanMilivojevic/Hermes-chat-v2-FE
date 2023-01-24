import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../auth'
import { toast } from 'react-toastify'

const PopUp = ({ setShowPopUp, setShowRegister }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Navigation
  const navigate = useNavigate()

  const onSubmit = (e) => {
    e.preventDefault()

    if (!email || !password) {
      toast.error('Please fill-in all data')
      return
    }
    login(email, password, navigate, setShowPopUp)
    setEmail('')
    setPassword('')
  }

  return (
    <div className='overlay' onClick={() => setShowPopUp(false)}>
      <div className='login-container' onClick={(e) => e.stopPropagation()}>
        <div className='x-container'>
          <h1>Login into your account</h1>
          <button className='x-btn' onClick={() => setShowPopUp(false)}>X</button>
        </div>
        <form className='login-form' onSubmit={onSubmit}>
          <div className='form-label-email'>
            <label>Email</label>
            <input type='email' placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div className='form-label-password'>
            <label>Password</label>
            <input type='password' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <button className='login-btn'>Login</button>
        </form>
        <div className='btn-container'>
          <button className='forgotpass-btn'>Forgot password?</button>
        </div>
        <div className='btn-container'>
          <button className='login-btn'onClick={() => { setShowRegister(true); setShowPopUp(false) }}>Create an account</button>
        </div>
      </div>
    </div>
  )
}

export default PopUp
