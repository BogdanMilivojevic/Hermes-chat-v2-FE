import React, { useContext, useState } from 'react'
import { PlusCircle } from 'phosphor-react'
import axios from 'axios'
import { ChatContext } from '../../context/ChatContext'

const Input = () => {
  const [text, setText] = useState('')
  const [file, setFile] = useState('')
  const { data } = useContext(ChatContext)

  const send = () => {
    const conversationId = data.conversation.id
    const token = localStorage.getItem('token')
    const sendMessage = async () => {
      try {
        await axios.post(`${process.env.REACT_APP_API_BASE_URL}/message/${conversationId}`, {
          text
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      } catch (err) {
        console.log(err)
      }
      setText('')
    }
    const sendImage = async () => {
      try {
        await axios.post(`${process.env.REACT_APP_API_BASE_URL}/message/${conversationId}`, {
          file
        }, {
          headers: {
            'Content-type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
          }
        })
      } catch (err) {
        console.log(err)
      }
    }
    if (text) {
      sendMessage()
    } else {
      sendImage()
    }
  }

  const handleKey = (e) => {
    (text || file) && e.key === 'Enter' && send()
  }

  return (
    <div className='input'>
      <input type='text' placeholder='Type something...'onChange={(e) => setText(e.target.value)} value={text} onKeyDown={handleKey}/>
      <div className='input-send'>
        <label htmlFor="file">
          <PlusCircle className='input-icon'/>
          <input style={{ display: 'none' }} type="file" id="file"onChange={(e) => setFile(e.target.files[0])} onKeyDown={handleKey} />
        </label>
        <button className='input-btn' onClick={ () => (file || text) && send()}>Send</button>
      </div>
    </div>
  )
}
export default Input
