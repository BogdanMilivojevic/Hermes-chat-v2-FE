import { render, screen, fireEvent } from '@testing-library/react'
import Input from '../components/Chat/Input'
import React from 'react'
import { UserContextProvider } from '../context/UserContext'
import { ChatContextProvider } from '../context/ChatContext'

describe('checks if message input is rendered', () => {
  beforeEach(() => {
    render(<ChatContextProvider><UserContextProvider><Input/></UserContextProvider></ChatContextProvider>)
  })
  test('message input should be rendered', () => {
    const messageInputEl = screen.getByPlaceholderText('Type something...')
    expect(messageInputEl).toBeInTheDocument()
  })
  test('message inputshould be empty', () => {
    const messageInputEl = screen.getByPlaceholderText('Type something...')
    expect(messageInputEl.value).toBe('')
  })
})

describe('checks if message input changes on new input', () => {
  beforeEach(() => {
    render(<ChatContextProvider><UserContextProvider><Input/></UserContextProvider></ChatContextProvider>)
  })
  test('message input value should change', () => {
    const messageInputEl = screen.getByPlaceholderText('Type something...')

    const testValue = 'test'
    fireEvent.change(messageInputEl, { target: { value: testValue } })
    expect(messageInputEl.value).toBe(testValue)
  })
})
