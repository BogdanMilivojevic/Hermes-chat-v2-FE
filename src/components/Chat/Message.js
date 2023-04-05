import React, { useContext, useState } from 'react'
import { ChatContext } from '../../context/ChatContext'
import { UserContext } from '../../context/UserContext'
import ImagePopup from './ImagePopup'
const Message = ({ message }) => {
  const { currentUser } = useContext(UserContext)
  const { data } = useContext(ChatContext)
  const [image, setImage] = useState('')
  const [popUp, setPopUp] = useState(false)

  // Converting timestamp to day, hour and minute
  const date = new Date(message.createdAt)
  const options = { hour: 'numeric', minute: 'numeric', weekday: 'long' }
  const time = new Intl.DateTimeFormat('en-US', options).format(date)

  return (
    <div className={`message ${message.userId === currentUser.id && 'owner'}`}>
      <div className='message-info'>
        <img src={message.userId === currentUser.id ? currentUser.photoURL : data.conversation.User.photoURL}/>
      </div>
      <div className='message-content'>
        <div className='message-output'>
          {message.photoURL && <img src={message.photoURL} onClick={() => { setImage(message.photoURL); setPopUp(true) }}/>}
          {message.body && <p>{message.body}</p>}
        </div>
        {message.createdAt && <span> {time}</span>}
      </div>
      {popUp && <ImagePopup image={image} setPopUp={setPopUp}/>}
    </div>
  )
}

export default Message
