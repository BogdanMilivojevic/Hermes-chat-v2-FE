import React, { useContext, useState } from 'react'
import { Bird, Pencil } from 'phosphor-react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const Navbar = () => {
  const navigate = useNavigate()
  const [changeName, setChangeName] = useState(false)
  const [newName, setNewName] = useState('')

  const { currentUser, setIsNew } = useContext(UserContext)
  const signout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  const handleNameChange = async () => {
    const token = localStorage.getItem('token')
    try {
      await axios.patch(`${process.env.REACT_APP_API_BASE_URL}/user/me`, {
        newName
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setChangeName(!changeName)
      setNewName('')
      setIsNew(true)
    } catch (err) {
      err.response.data ? toast.error(err.response.data.message) : toast.error('Something went wrong')
    }
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
        <Pencil className='change-name-icon' onClick={() => setChangeName(!changeName)}/>
        { changeName && <div className='change-name'>
          <input type='text' value={newName} onChange={(e) => setNewName(e.target.value) }/>
          <button onClick={() => handleNameChange()}>Change name</button>
        </div>}
      </div>}
      <button className='logout-btn' onClick={signout}>Logout</button>
    </div>
  )
}

export default Navbar
