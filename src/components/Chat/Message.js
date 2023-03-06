import React, { useContext, useRef, useState } from 'react'
import { ChatContext } from '../../context/ChatContext'
import { UserContext } from '../../context/UserContext'
import { ReactComponent as FileIcon } from '../../img/file-icon.svg'
import ImagePopup from './ImagePopup'
const Message = ({ message }) => {
  const { currentUser } = useContext(UserContext)
  const { data } = useContext(ChatContext)
  const [image, setImage] = useState('')
  const [popUp, setPopUp] = useState(false)

  // Converting timestamp to day, hour and minute
  // const date = message.date.toDate()
  // const options = { hour: 'numeric', minute: 'numeric', weekday: 'long' }
  // const time = new Intl.DateTimeFormat('en-US', options).format(date)

  const downloadFile = (file) => {
    window.open(file, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className={`message ${message.userId === currentUser.id && 'owner'}`}>
      <div className='message-info'>
        <img src={message.userId === currentUser.id ? currentUser.photoURL : data.conversation.Users.photoURL}/>
      </div>
      <div className='message-content'>
        <div className='message-output'>
          {/* {message.img && <img src={message.img} onClick={() => { setImage(message.img); setPopUp(true) }}/>}
          {message.file && <div className='message-file' onClick={() => downloadFile(message.file)}> <FileIcon className='file-icon'/>
            <p>{message.name}</p></div> } */}
          {message.body && <p>{message.body}</p>}
        </div>
        {/* {message.date && <span> {time}</span>} */}
      </div>
      {popUp && <ImagePopup image={image} setPopUp={setPopUp}/>}
    </div>
  )
}

export default Message
