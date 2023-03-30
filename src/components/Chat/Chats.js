import React, { useContext } from 'react'
import { Image } from 'phosphor-react'
import { ChatContext } from '../../context/ChatContext'
import { ConversationContext } from '../../context/ConversationContext'
import { SocketContext } from '../../context/SocketContext'
import axios from 'axios'

const Chats = ({ setChat }) => {
  const { conversation, setIsNew } = useContext(ConversationContext)
  const { socket } = useContext(SocketContext)
  const { dispatch } = useContext(ChatContext)

  socket.current?.on('newMessage', (payload) => {
    setIsNew(true)
  })

  const handleSelect = (data) => {
    dispatch({ type: 'CHANGE_USER', payload: data })
  }
  const handleHover = async (chatId) => {
    const token = localStorage.getItem('token')
    try {
      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/conversation/${chatId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setIsNew(true)
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className='chats'>
      { conversation.length > 0 && conversation.map((chat, i) => (
        <div className='user-chat' key={i} onClick={() => { handleSelect(chat); setChat() }}>
          {chat.User.photoURL && <img className='user-picture' src={chat.User.photoURL}/>}
          <div className='user-info'>
            {chat.User.username && <span className='user-name'> {chat.User.username}</span>}
            {chat.lastMessage?.body && <p className='last-m'>{`${chat.lastMessage.body}`}</p>}
            {chat.lastMessage?.image && <p className='last-m-content'>
              <Image className='last-m-icon'/>Image</p>}
          </div>
          <button className='chat-delete-btn' onClick={(e) => { e.stopPropagation(); handleHover(chat.id) }}>Delete chat</button>
        </div>
      ))}
    </div>
  )
}

export default Chats
