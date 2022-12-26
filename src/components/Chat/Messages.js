import React, { useContext, useEffect, useRef, useState } from 'react'
import Message from './Message'
import { ChatContext } from '../../context/ChatContext'
import axios from 'axios'
const Messages = () => {
  const [messages, setMessages] = useState('')
  const { data } = useContext(ChatContext)
  const [messageCount, setMessageCount] = useState(25)
  const [loading, setLoading] = useState(false)
  const myRef = useRef()
  const lastIndex = messages.length - 1

  // Used to reset count if switched to new chat
  useEffect(() => {
    setMessageCount(25)
  }, [data])

  const fetchMore = () => {
    setLoading(true)
    setMessageCount(messageCount + 25)
  }
  // Observing if the oldest message is visible, and if it is, function fetchMore is called
  useEffect(() => {
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver((entries) => {
        const entry = entries[0]
        if (entry.isIntersecting && messages.length >= 25) {
          fetchMore()
          observer.unobserve(entry.target)
        }
      }, {
        threshold: 1
      })
      if (messageCount > messages.length) {
        setLoading(false)
        observer.unobserve(myRef.current.firstElementChild)
      }
      if (myRef.current.firstElementChild) {
        observer.observe(myRef.current.firstElementChild)
      }
    }, 1500)
    return () => clearTimeout(timer)
  }, [messages])

  // Scrolling to the latest message when the chat loads
  useEffect(() => {
    const timer = setTimeout(() => {
      myRef.current.lastElementChild.scrollIntoView({ behavior: 'smooth' })
    }, 500)
    return () => clearTimeout(timer)
  }, [data.chatId])
  // Scrolling to the latest message if there is a new latest message
  useEffect(() => {
    myRef.current.lastElementChild?.scrollIntoView({ behavior: 'smooth' })
  }, [messages[lastIndex] ? messages[lastIndex].body : null])

  useEffect(() => {
    const getMessages = async () => {
      const conversationId = data.user.ConversationId
      try {
        const conversation = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/conversation/getMessages`, {
          conversationId,
          messageCount
        })
        setMessages(conversation.data.conversation)
      } catch (err) {
        console.log(err)
      }
      return () => {
        getMessages()
      }
    }
    data && getMessages()
  }, [data, messageCount])

  return (
    <div className='messages' ref={myRef}>
      { loading && <p className='messages-loading'>Fetching older messages...</p>}
      {messages.length > 0 && messages.map((message, i) => (
        <Message message ={message} key={i}/>
      ))}
    </div>
  )
}

export default Messages
