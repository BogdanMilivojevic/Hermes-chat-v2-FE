import { toast } from 'react-toastify'

import axios from 'axios'

// REGISTER USER
export const register = async (email, password, username, avatar, passwordConfirm, navigate, setShowRegister, setUsername, setEmail, setPassword, setFile, setPasswordConfirm) => {
  if (passwordConfirm !== password) toast.error('Passwords must match')

  try {
    const user = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/user/register`, {
      username,
      email,
      password,
      avatar
    }, {
      headers: {
        'Content-type': 'multipart/form-data'
      }
    })
    navigate('/chat')
    setShowRegister(false)
    setUsername('')
    setEmail('')
    setPassword('')
    setFile(null)
    setPasswordConfirm('')
    localStorage.setItem('token', user.data.token)
  } catch (err) {
    err.response.data ? toast.error(err.response.data.message) : toast.error('Something went wrong')
  }
}
export const login = async (email, password, navigate, setShowPopUp) => {
  try {
    const user = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/user/login`, {
      email,
      password
    })
    navigate('/chat')
    setShowPopUp(false)
    localStorage.setItem('token', user.data.token)
  } catch (err) {
    toast.error(err.response.data.message)
  }
}
