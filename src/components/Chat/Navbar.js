import React, { useState, useEffect } from 'react'
import { Bird } from 'phosphor-react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const [currentUser, setUser] = useState('')
  // Current user
  useEffect(() => {
    const token = localStorage.getItem('token')
    const getUser = async () => {
      try {
        const u = await axios.post('http://127.0.0.1:4000/user', {
          token
        })
        console.log(u)
        setUser(u)
      } catch (err) {
        console.log(err)
      }
    }
    getUser()
  }, [])

  const navigate = useNavigate()

  const signout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <div className='navbar'>
      <div className='navbar-logo'>
        <Bird className='navbar-icon'/>
        <p>Hermes-Chat</p>
      </div>
      { currentUser && <div className='navbar-user'>
        <img src={currentUser.data.user.photoURL}/>
        <span>{currentUser.data.user.username}</span>
      </div>}
      <button className='logout-btn' onClick={signout}>Logout</button>
    </div>
  )
}

export default Navbar
