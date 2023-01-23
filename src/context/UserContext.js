import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'

export const UserContext = createContext()

export const UserContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('token')
    const getUser = async () => {
      try {
        const u = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/user/me`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setCurrentUser(u.data.user)
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
