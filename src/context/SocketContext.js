import React, { createContext, useEffect, useRef } from 'react'
import { io } from 'socket.io-client'

export const SocketContext = createContext()
export const SocketContextProvider = ({ children }) => {
  const socket = useRef()

  const token = localStorage.getItem('token')
  useEffect(() => {
    socket.current = io.connect(process.env.REACT_APP_API_BASE_URL, {
      autoConnect: false
    })
    socket.current.auth = { token }
    socket.current.connect()

    socket.current.onAny((event, ...args) => {
      console.log(event, args)
    })

    socket.current.on('connect_error', (err) => {
      console.log(err)
    })
    return () => socket.current.disconnect()
  }, [token])

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  )
}
