import React, { useContext, useEffect, useState } from 'react'
import Messages from './Messages'
import Input from './Input'
import { ChatContext } from '../../context/ChatContext'
import sound from '../../sound/notification-sound.mp3'
import { Bird } from 'phosphor-react'
import { UserContext } from '../../context/UserContext'

const Conversation = ({ setShowChat }) => {
  const { data } = useContext(ChatContext)
  const { currentUser } = useContext(UserContext)
  const [userData, setUserData] = useState({})
  const [count, setCount] = useState(0)

  // New Message notification
  const showNotification = (count) => {
    const newCount = count + 1
    if (document.hidden && currentUser.id) {
      setCount(newCount)
      document.title = `(${newCount}) Messages`
      const audio = new Audio(sound)
      audio.play()
    }
  }
  useEffect(() => {
    const getData = () => {
      const unsub = onSnapshot(doc(db, 'userConversations', currentUser.uid), (doc) => {
        doc.exists() && setUserData(doc.data())
      })
      return () => {
        unsub()
      }
    }
    currentUser.uid && getData()
  }, [currentUser.uid])

  useEffect(() => {
    showNotification(count)
  }, [userData])

  // Reseting the document.title
  document.onvisibilitychange = () => {
    if (!document.hidden) {
      setCount(0)
      document.title = 'Hermes-chat'
    }
  }

  if (data) {
    return (
      <div className='chat'>
        <div className='chat-info'>
          <button className='back-btn' onClick={() => setShowChat(false)}> Go back</button>
          {data.user && <span>{data.user['User.username']}</span>}
          {data.user && <img src={data.user['User.photoURL']}/>}
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
