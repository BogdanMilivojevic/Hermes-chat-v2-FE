import { storage } from './firebase'
import { toast } from 'react-toastify'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import axios from 'axios'

// REGISTER USER
export const register = async (email, password, username, file, passwordConfirm, navigate, setShowRegister, setUsername, setEmail, setPassword, setFile, setPasswordConfirm) => {
  try {
    const date = new Date().getTime()
    const storageRef = ref(storage, `${username + date}`)

    await uploadBytesResumable(storageRef, file).then(() => {
      getDownloadURL(storageRef).then(async (downloadURL) => {
        try {
          const user = await axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API_REGISTER_URL}`,
            data: {
              username,
              email,
              password,
              passwordConfirm,
              photoURL: downloadURL
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
          toast.error(err.response.data.message)
        }
      })
    })
  } catch (err) {
    console.log(err)
  }
}
export const login = async (email, password, navigate, setShowPopUp) => {
  console.log(process.env.REACT_APP_API_LOGIN_URL)
  try {
    const user = await axios.post(`${process.env.REACT_APP_API_LOGIN_URL}`, {
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
