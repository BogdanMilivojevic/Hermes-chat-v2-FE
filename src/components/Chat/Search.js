import React, { useState, useMemo } from 'react'
import debounce from 'lodash.debounce'
import { MagnifyingGlass } from 'phosphor-react'
import axios from 'axios'

const Search = () => {
  const [users, setUsers] = useState('')
  const [notFound, setNotFound] = useState(false)
  // User search
  const searchUser = async (username) => {
    if (!username) {
      setNotFound(false)
      setUsers('')
      return
    }

    try {
      const u = await axios.post('http://127.0.0.1:4000/user/getSearchedUser', {
        username
      })
      setUsers(u)
    } catch (err) {
      setUsers('')
      setNotFound(true)
    }
  }

  const debouncedSearchUser = useMemo(
    () => debounce(searchUser, 500)
    , [])

  return (
    <div className='search'>
      <div className='search-form'>
        <MagnifyingGlass className='search-form-icon'/>
        <input type='text' placeholder='Search for a user to start a chat' id='input' onChange={(e) => debouncedSearchUser(e.target.value)}/>
      </div>
      {notFound && users.length === 0 && <div className='user-chat searched'>
        <div className='user-info'>
          <span className='user-name'>No user found!</span>
        </div>
        </div>}
      {users && <div className='user-chat searched'>
        <img className='user-picture' src={users.data.users.photoURL}/>
        <div className='user-info'>
          <span className='user-name'>{users.data.users.username}</span>
        </div>
      </div>}
    </div>
  )
}

export default Search
