import React, { useState, useMemo, useContext } from 'react'
import debounce from 'lodash.debounce'
import { MagnifyingGlass } from 'phosphor-react'
import axios from 'axios'
import { UserContext } from '../../context/UserContext'

const Search = () => {
  const [searchedUser, setSearchedUser] = useState('')
  const [notFound, setNotFound] = useState(false)
  const { currentUser } = useContext(UserContext)
  // User search
  const searchUser = async (username) => {
    if (!username) {
      setNotFound(false)
      setSearchedUser('')
      return
    }

    try {
      const u = await axios.post(`${process.env.REACT_APP_BASE_URL}/user/getSearchedUser`, {
        username

      })
      setSearchedUser(u)
    } catch (err) {
      setSearchedUser('')
      setNotFound(true)
    }
  }

  const debouncedSearchUser = useMemo(
    () => debounce(searchUser, 500)
    , [])

  const createConversation = async (searchedUserUsername) => {
    try {
      const currentUserUsername = currentUser.username
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/conversation/createConversation`, {
        searchedUserUsername,
        currentUserUsername
      })
    } catch (err) {
      console.log(err)
    }
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
      {searchedUser && <div className='user-chat searched' onClick={() => createConversation(searchedUser.data.user.username)}>
        <img className='user-picture' src={searchedUser.data.user.photoURL}/>
        <div className='user-info'>
          <span className='user-name'>{searchedUser.data.user.username}</span>
        </div>
      </div>}
    </div>
  )
}

export default Search
