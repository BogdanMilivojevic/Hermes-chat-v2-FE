import { render, fireEvent, screen } from '@testing-library/react'
import Register from '../components/Register'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

describe('checks if form inputs are rendered', () => {
  beforeEach(() => {
    render(<BrowserRouter><Register/></BrowserRouter>)
  })
  test('username input should be rendered', () => {
    const usernameInputEl = screen.getByPlaceholderText('username')
    expect(usernameInputEl).toBeInTheDocument()
  })
  test('email input should be rendered', () => {
    const emailInputEl = screen.getByPlaceholderText('email')
    expect(emailInputEl).toBeInTheDocument()
  })
  test('password input should be rendered', () => {
    const passwordInputEl = screen.getByPlaceholderText('password')
    expect(passwordInputEl).toBeInTheDocument()
  })
  test('password-confirm input should be rendered', () => {
    const passwordConfirmInputEl = screen.getByPlaceholderText('password-confirm')
    expect(passwordConfirmInputEl).toBeInTheDocument()
  })
  test('profile image input should be rendered', () => {
    const profileImageInputEl = screen.getByTestId('profile-img')
    expect(profileImageInputEl).toBeInTheDocument()
  })
  test('register button should be rendered', () => {
    const registerButton = screen.getByRole('button', { name: /register now/i })
    expect(registerButton).toBeInTheDocument()
  })
})

describe('checks if form inputs are empty', () => {
  beforeEach(() => {
    render(<BrowserRouter><Register/></BrowserRouter>)
  })
  test('username input should be empty', () => {
    const usernameInputEl = screen.getByPlaceholderText('username')
    expect(usernameInputEl.value).toBe('')
  })
  test('email input should be empty', () => {
    const emailInputEl = screen.getByPlaceholderText('email')
    expect(emailInputEl.value).toBe('')
  })
  test('password input should be empty', () => {
    const passwordInputEl = screen.getByPlaceholderText('password')
    expect(passwordInputEl.value).toBe('')
  })
  test('password-confirm input should be empty', () => {
    const passwordConfirmInputEl = screen.getByPlaceholderText('password-confirm')
    expect(passwordConfirmInputEl.value).toBe('')
  })
  test('image input should be empty', () => {
    const profileImageInputEl = screen.getByTestId('profile-img')
    expect(profileImageInputEl.value).toBe('')
  })
})

describe('checks if input values change on new input', () => {
  beforeEach(() => {
    render(<BrowserRouter><Register/></BrowserRouter>)
  })
  test('username input should change', () => {
    const usernameInputEl = screen.getByPlaceholderText('username')

    const testValue = 'test'
    fireEvent.change(usernameInputEl, { target: { value: testValue } })
    expect(usernameInputEl.value).toBe(testValue)
  })
  test('email input should change', () => {
    const emailInputEl = screen.getByPlaceholderText('email')

    const testValue = 'test@test.com'
    fireEvent.change(emailInputEl, { target: { value: testValue } })
    expect(emailInputEl.value).toBe(testValue)
  })
  test('password input should change', () => {
    const passwordInputEl = screen.getByPlaceholderText('password')

    const testValue = 'test'
    fireEvent.change(passwordInputEl, { target: { value: testValue } })
    expect(passwordInputEl.value).toBe(testValue)
  })
  test('password-confirm input should change', () => {
    const passwordConfirmInputEl = screen.getByPlaceholderText('password-confirm')

    const testValue = 'test'
    fireEvent.change(passwordConfirmInputEl, { target: { value: testValue } })
    expect(passwordConfirmInputEl.value).toBe(testValue)
  })
  test('image input should change', () => {
    const profileImageInputEl = screen.getByTestId('profile-img')

    const testValue = ''
    fireEvent.change(profileImageInputEl, { target: { value: testValue } })
    expect(profileImageInputEl.value).toBe(testValue)
  })
})
