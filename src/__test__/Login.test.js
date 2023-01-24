import { render, fireEvent, screen } from '@testing-library/react'
import PopUp from '../components/PopUp'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

describe('checks if form inputs are rendered', () => {
  beforeEach(() => {
    render(<BrowserRouter><PopUp/></BrowserRouter>)
  })
  test('email input should be rendered', () => {
    const emailInputEl = screen.getByPlaceholderText('email')
    expect(emailInputEl).toBeInTheDocument()
  })
  test('password input should be rendered', () => {
    const passwordInputEl = screen.getByPlaceholderText('password')
    expect(passwordInputEl).toBeInTheDocument()
  })
  test('login button should be rendered', () => {
    const loginButton = screen.getByRole('button', { name: /create an account/i })
    expect(loginButton).toBeInTheDocument()
  })
})

describe('checks if inputs form inputs are empty', () => {
  beforeEach(() => {
    render(<BrowserRouter><PopUp/></BrowserRouter>)
  })
  test('email input should be empty', () => {
    const emailInputEl = screen.getByPlaceholderText('email')
    expect(emailInputEl.value).toBe('')
  })
  test('password input should be empty', () => {
    const passwordInputEl = screen.getByPlaceholderText('password')
    expect(passwordInputEl.value).toBe('')
  })
})

describe('checks if inputs value change on new input', () => {
  beforeEach(() => {
    render(<BrowserRouter><PopUp/></BrowserRouter>)
  })
  test('email input should change ', () => {
    const emailInputEl = screen.getByPlaceholderText('email')

    const testData = 'test@test.com'
    fireEvent.change(emailInputEl, { target: { value: testData } })
    expect(emailInputEl.value).toBe(testData)
  })
  test('password input should change', () => {
    const passwordInputEl = screen.getByPlaceholderText('password')

    const testData = 'test'
    fireEvent.change(passwordInputEl, { target: { value: testData } })
    expect(passwordInputEl.value).toBe(testData)
  })
})
