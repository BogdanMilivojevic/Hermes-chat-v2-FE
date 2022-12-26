import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { UserContext } from './UserContext'

export const ConversationContext = createContext()

export const ConversationContextProvider = ({ children }) => {
  const { currentUser } = useContext(UserContext)

  const [conversation, setConversation] = useState('')
  const [isNew, setIsNew] = useState(false)

  useEffect(() => {
    const getChats = async () => {
      const token = localStorage.getItem('token')
      try {
        const c = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/conversation`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        c.data.data ? setConversation(c.data.data) : setConversation(c.data.conversations)
      } catch (err) {
        console.log(err)
      }
      return () => {
        getChats()
      }
    }
    currentUser && getChats()
  }, [currentUser, isNew])

  return (
    <ConversationContext.Provider value={{ conversation, isNew, setIsNew }}>
      {children}
    </ConversationContext.Provider>
  )
}
