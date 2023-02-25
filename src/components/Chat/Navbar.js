import React, { useContext } from 'react'
import { Bird } from 'phosphor-react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'

const Navbar = () => {
  const navigate = useNavigate()

  const { currentUser } = useContext(UserContext)
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
        <img src={currentUser.photoURL}/>
        <span>{currentUser.username}</span>
      </div>}
      <button className='logout-btn' onClick={signout}>Logout</button>
    </div>
  )
}

export default Navbar
