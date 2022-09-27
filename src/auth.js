import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from './firebase'

// USER LOGIN
export const login = async (credentials, navigate) => {
  const loginData = { ...credentials }
  try {
    const loginUser = await signInWithEmailAndPassword(auth, loginData.email, loginData.password)
    if (loginUser) navigate('/chat')
  } catch (error) {
    console.log(error.message)
    alert('Email or password is wrong, please try again')
  }
}
// REGISTER USER
export const register = async (credentials, navigate) => {
  const registerData = { ...credentials }
  try {
    const registerUser = await createUserWithEmailAndPassword(auth, registerData.email, registerData.password)
    if (registerUser) navigate('/chat')
  } catch (error) {
    console.log(error.message)
    alert('Email or password are not correctly written, please try again')
  }
}
// LOGOUT USER
export const logout = async (navigate) => {
  await signOut(auth)
  navigate('/')
}