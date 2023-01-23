import React, { useContext } from 'react'
// import { Image, FileText } from 'phosphor-react'
import { ChatContext } from '../../context/ChatContext'
import { ConversationContext } from '../../context/ConversationContext'

const Chats = ({ setChat }) => {
  const { conversation } = useContext(ConversationContext)
  const { dispatch } = useContext(ChatContext)

  const handleSelect = (data) => {
    dispatch({ type: 'CHANGE_USER', payload: data })
  }
  return (
    <div className='chats'>
      { conversation.length > 0 && conversation.map((chat, i) => (
        <div className='user-chat' key={i} onClick={() => { handleSelect(chat); setChat() }}>
          {chat.Users.photoURL && <img className='user-picture' src={chat.Users.photoURL }/>}
          <div className='user-info'>
            {chat.Users.username && <span className='user-name'> {chat.Users.username}</span>}
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
