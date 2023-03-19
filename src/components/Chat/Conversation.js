import React, { useContext } from 'react'
import Messages from './Messages'
import Input from './Input'
import { ChatContext } from '../../context/ChatContext'

import { Bird } from 'phosphor-react'

const Conversation = ({ setShowChat }) => {
  const { data } = useContext(ChatContext)

  if (data) {
    return (
      <div className='chat'>
        <div className='chat-info'>
          <button className='back-btn' onClick={() => setShowChat(false)}> Go back</button>
          {data.conversation.User && <span>{data.conversation.User.username}</span>}
          {data.conversation.User.photoURL && <img src={ data.conversation.User.photoURL }/>}
          <div className='navbar-logo-chat'>
            <Bird className='navbar-icon'/>
            <p>Hermes-Chat</p>
          </div>
        </div>
        <Messages/>
        <Input/>
      </div>
    )
  }
}

export default Conversation
