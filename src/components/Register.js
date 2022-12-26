import React, { useState } from 'react'
import { register } from '../auth'
import { useNavigate } from 'react-router-dom'
import { Image, ArrowCircleLeft } from 'phosphor-react'

const Register = ({ setShowRegister, setShowPopUp }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [username, setUsername] = useState('')
  const [file, setFile] = useState(null)

  // Navigation
  const navigate = useNavigate()

  const onSubmit = (e) => {
    e.preventDefault()

    if (!email || !password || !username || !file || !passwordConfirm) {
      alert('Please fill-in all data')
      return
    }
    register(email, password, username, file, passwordConfirm, navigate, setShowRegister, setUsername, setEmail, setPassword, setFile, setPasswordConfirm)
  }

  return (
    <div className='overlay' onClick={() =>
      setShowRegister(false)}>
      <div className='login-container' onClick={(e) => e.stopPropagation()}>
        <div className='x-container'>
          <h1>Register your account</h1>
          <ArrowCircleLeft className='back-register-btn' onClick={() => { setShowRegister(false); setShowPopUp(true) }}/>
          <button className='x-btn' onClick={() =>
            setShowRegister(false)}>X</button>
        </div>
        <form className='login-form' onSubmit={onSubmit}>
          <div className='form-label-register-username'>
            <label>Username</label>
            <input type='text' placeholder='Your username' value={username} onChange={(e) => setUsername(e.target.value)}/>
          </div>
          <div className='form-label-register-email'>
            <label>Email</label>
            <input type='email' placeholder='Your email' value={email} onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div className='form-label-register-password'>
            <label>Password</label>
            <input type='password' placeholder='Your password' value={password} onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <div className='form-label-register-confirm-password'>
            <label>Password Confirm</label>
            <input type='password' placeholder='Your password' value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)}/>
          </div>
          <label className='form-label-image' htmlFor="file">
            <input style={{ display: 'none' }} type="file" id="file"onChange={(e) => setFile(e.target.files[0])} />
            <Image className='image-icon'/>
            <span>Add an avatar</span>
          </label>
          <button className='login-btn'>Register now</button>
        </form>
      </div>
    </div>
  )
}

export default Register
