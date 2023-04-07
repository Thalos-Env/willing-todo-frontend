import axios from 'axios'
import * as jose from 'jose'
import { todoType } from '../types/todoType'

export const REACT_APP_API_URL = 'http://todorestapplication.us-east-1.elasticbeanstalk.com:8080'

export const isKeepLogged = () => localStorage.getItem('keepLogged') === 'true'

export const getToken = () => {
  const keepLogged = isKeepLogged()
  if (keepLogged) {
    return localStorage.getItem('token')
  } else {
    return sessionStorage.getItem('token')
  }
}

export const decodeToken = (token: string) => {
  try {
    const decodedToken = jose.decodeJwt(token)
    return decodedToken
  } catch (error) {
    return null
  }
}

export const isTokenExpired = () => {
  const userExp = isKeepLogged()
    ? localStorage.getItem('userExp')
    : sessionStorage.getItem('userExp')

  if (!userExp) return true

  const now = new Date()
  const exp = new Date(Number(userExp) * 1000)

  if (now > exp) logout()
  return now > exp
}

export const isAuth = () => getToken() !== null && !isTokenExpired()

export const getUserName = () =>
  localStorage.getItem('username') || sessionStorage.getItem('username')

export const storageToken = (token: string) => {
  const keepLogged = isKeepLogged()
  const decodedToken = decodeToken(token)

  if (!decodedToken) return
  if (keepLogged) {
    localStorage.setItem('token', token)
    localStorage.setItem('username', decodedToken?.sub as string)
    localStorage.setItem('userExp', decodedToken?.exp?.toString() as string)
  } else {
    sessionStorage.setItem('token', token)
    sessionStorage.setItem('username', decodedToken?.sub as string)
    sessionStorage.setItem('userExp', decodedToken?.exp?.toString() as string)
  }
}

export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('username')
  localStorage.removeItem('keepLogged')
  localStorage.removeItem('userExp')
  sessionStorage.removeItem('token')
  sessionStorage.removeItem('username')
  sessionStorage.removeItem('userExp')
  window.location.href = '/'
}

export const handleLogin = async (username: string, password: string) => {
  const response = await axios.post(`${REACT_APP_API_URL}/authenticate`, {
    username: username,
    password: password,
  })
  return response
}

export const refreshToken = async () => {
  const token = getToken()
  if (!token) return null
  const response = await axios.get(`${REACT_APP_API_URL}/refresh`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response
}

export const getAllTodos = async () => {
  const token = getToken()
  if (!token) return null
  const username = getUserName()
  const response = await axios.get(`${REACT_APP_API_URL}/users/${username}/todos`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response
}

export const getTodoById = async (id: number) => {
  const token = getToken()
  if (!token) return null
  const username = getUserName()
  const response = await axios.get(`${REACT_APP_API_URL}/users/${username}/todos/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response
}

export const createTodo = async (createTodo: Omit<todoType, 'id' | 'username'>) => {
  const token = getToken()
  if (!token) return null
  const username = getUserName()
  const response = await axios.post(
    `${REACT_APP_API_URL}/users/${username}/todos`,
    { ...createTodo, username: username },
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  )
  return response
}

export const updateTodo = async (id: string, updatedTodo: todoType) => {
  const token = getToken()
  if (!token) return null
  const response = await axios.put(
    `${REACT_APP_API_URL}/users/${updatedTodo.username}/todos/${id}`,
    updatedTodo,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  )
  return response
}

export const deleteTodo = async (id: string) => {
  const token = getToken()
  if (!token) return null
  const username = getUserName()
  const response = await axios.delete(`${REACT_APP_API_URL}/users/${username}/todos/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response
}
