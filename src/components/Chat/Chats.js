import React, { useContext } from 'react'
// import { Image, FileText } from 'phosphor-react'
import { ChatContext } from '../../context/ChatContext'
import { ConversationContext } from '../../context/ConversationContext'
import { SocketContext } from '../../context/SocketContext'

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
  return (
    <div className='chats'>
      { conversation.length > 0 && conversation.map((chat, i) => (
        <div className='user-chat' key={i} onClick={() => { handleSelect(chat); setChat() }}>
          {chat.User.photoURL && <img className='user-picture' src={chat.User.photoURL}/>}
          <div className='user-info'>
            {chat.User.username && <span className='user-name'> {chat.User.username}</span>}
            {chat.lastMessage?.body && <p className='last-m'>{`${chat.lastMessage.body}`}</p>}
            {/* <p className='last-m-content'>
              <Image className='last-m-icon'/>
              <FileText className='last-m-icon'/>Image/File</p> */}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Chats
