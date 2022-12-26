import React, { useContext, useEffect, useState } from 'react'
import { Image, FileText } from 'phosphor-react'
import { ChatContext } from '../../context/ChatContext'
import { UserContext } from '../../context/UserContext'
import axios from 'axios'

const Chats = ({ setChat }) => {
  const [chats, setChats] = useState('')
  const { currentUser } = useContext(UserContext)
  const { dispatch } = useContext(ChatContext)

  useEffect(() => {
    const getChats = async () => {
      try {
        const id = currentUser.id
        const c = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/conversation/getConversations`, {
          id
        })
        setChats(c.data.dataArr)
      } catch (err) {
        console.log(err)
      }
      return () => {
        getChats()
      }
    }
    (currentUser && chats.length === 0) && getChats()
  }, [currentUser])

  const handleSelect = (u) => {
    dispatch({ type: 'CHANGE_USER', payload: u })
  }
  return (

    <div className='chats'>
      { chats.length > 0 && chats.map((chat, i) => (
        <div className='user-chat' key={i} onClick={() => { handleSelect(chat); setChat() }}>
          {chat.u['User.photoURL'] && <img className='user-picture' src={chat.u['User.photoURL']}/>}
          <div className='user-info'>
            {chat.u['User.username'] && <span className='user-name'> {chat.u['User.username']}</span>}
            {chat.c && <p className='last-m'>{chat.c[chat.c.length - 1].body}</p>}
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
