import React, { useState } from 'react'
import { SocketContextProvider } from '../../context/SocketContext'
import { UserContextProvider } from '../../context/UserContext'
import Conversation from './Conversation'
import SidebarCmp from './SidebarCmp'

function Chat () {
  const [showChat, setShowChat] = useState(false)
  return (
    <UserContextProvider>
      <SocketContextProvider>
        <div className='home'>
          <div className='container'>
            {(!showChat) && <SidebarCmp setShowChat={setShowChat}/>}
            {showChat && <Conversation setShowChat={setShowChat}/>}
          </div>
        </div>
      </SocketContextProvider>
    </UserContextProvider>

  )
}
export default Chat
