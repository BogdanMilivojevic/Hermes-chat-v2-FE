import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'

export const UserContext = createContext()

export const UserContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('token')
    const getUser = async () => {
      try {
        const u = await axios.post('http://127.0.0.1:4000/user', {
          token
        })
        setCurrentUser(u)
      } catch (err) {
        console.log(err)
      }
    }
    getUser()
  }, [])

  return (
    <UserContext.Provider value={{ currentUser }}>
      {children}
    </UserContext.Provider>
  )
}
