import React from 'react'
import Navbar from './Navbar'
import Search from './Search'
import Chats from './Chats'
import { ConversationContextProvider } from '../../context/ConversationContext'

const SidebarCmp = ({ setShowChat }) => {
  const setChat = () => {
    setShowChat(true)
  }

  return (
    <ConversationContextProvider>
      <div className='sidebar'>
        <Navbar/>
        <Search/>
        <Chats setChat={setChat}/>
      </div>
    </ConversationContextProvider>
  )
}

export default SidebarCmp
