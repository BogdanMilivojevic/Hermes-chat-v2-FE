import { render, fireEvent, screen } from '@testing-library/react'
import Search from '../components/Chat/Search'
import React from 'react'
import { UserContextProvider } from '../context/UserContext'
import { ConversationContextProvider } from '../context/ConversationContext'

describe('check the search input', () => {
  beforeEach(() => {
    render(<UserContextProvider><ConversationContextProvider>
      <Search/>
    </ConversationContextProvider> </UserContextProvider>)
  })
  test('search input should be rendered', () => {
    const searchInputEl = screen.getByPlaceholderText('Search for a user to start a chat')
    expect(searchInputEl).toBeInTheDocument()
  })
  test('search input should be empty ', () => {
    const searchInputEl = screen.getByPlaceholderText('Search for a user to start a chat')
    expect(searchInputEl.value).toBe('')
  })
  test('search input should change', () => {
    const searchInputEl = screen.getByPlaceholderText('Search for a user to start a chat')

    const testValue = 'test'
    fireEvent.change(searchInputEl, { target: { value: testValue } })
    expect(screen.getByDisplayValue('test')).toBeInTheDocument()
  })
})

describe('check if not found and user found are not rendered ', () => {
  beforeEach(() => {
    render(<UserContextProvider><ConversationContextProvider>
      <Search/>
    </ConversationContextProvider> </UserContextProvider>)
  })
  test('not found should not be rendered', () => {
    const notFoundEl = screen.queryByText(/No user found/i)
    expect(notFoundEl).toBe(null)
  })
  test('user found should not be rendered', () => {
    const userFoundEl = screen.queryByTestId('user-found')
    expect(userFoundEl).toBe(null)
  })
})
