import React, { useState, useMemo, useContext } from 'react'
import debounce from 'lodash.debounce'
import { MagnifyingGlass } from 'phosphor-react'
import axios from 'axios'
import { ConversationContext } from '../../context/ConversationContext'

const Search = () => {
  const [searchedUser, setSearchedUser] = useState('')
  const [notFound, setNotFound] = useState(false)
  const { setIsNew } = useContext(ConversationContext)
  // User search
  const searchUser = async (username) => {
    if (!username) {
      setNotFound(false)
      setSearchedUser('')
      return
    }

    try {
      const u = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/user/${username}`)
      u.data.message === 'User found' ? setSearchedUser(u.data.user) : setNotFound(true)
    } catch (err) {
      console.log(err)
    }
  }

  const debouncedSearchUser = useMemo(
    () => debounce(searchUser, 500)
    , [])

  const createConversation = async (searchedUserUsername, setSearchedUser) => {
    const input = document.getElementById('input')
    try {
      const token = localStorage.getItem('token')
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/conversation`, {
        searchedUserUsername
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setIsNew(true)
    } catch (err) {
      console.log(err)
    }
    input.value = ''
    setSearchedUser('')
    setNotFound(false)
  }

  return (
    <div className='search'>
      <div className='search-form'>
        <MagnifyingGlass className='search-form-icon'/>
        <input type='text' placeholder='Search for a user to start a chat' id='input' onChange={(e) => debouncedSearchUser(e.target.value)}/>
      </div>
      {notFound && searchedUser.length === 0 && <div className='user-chat searched'>
        <div className='user-info'>
          <span className='user-name'>No user found!</span>
        </div>
        </div>}
      {searchedUser && <div className='user-chat searched' onClick={() => createConversation(searchedUser.username, setSearchedUser)}>
        <img className='user-picture' src={searchedUser.photoURL}/>
        <div className='user-info'>
          <span className='user-name'>{searchedUser.username}</span>
        </div>
      </div>}
    </div>
  )
}

export default Search
