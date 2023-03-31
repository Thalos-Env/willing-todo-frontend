import { createContext, useState, useEffect } from 'react'
import useRefreshToken from '../hooks/useRefreshToken'
import { getAllTodos } from '../services/api'
import { todoType } from '../types/todoType'

interface ITodoContextType {
  isLoading: boolean
  error: boolean
  todosList: todoType[]
  selectedTodo: todoType
  username: string
  fetchAllTodos: () => void
  setTodosList: (todosList: todoType[]) => void
  setSelectedTodo: (selectedTodo: todoType) => void
  setIsPolling: (isPolling: boolean) => void
}

export const TodoContext = createContext<ITodoContextType>({} as ITodoContextType)

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [todosList, setTodosList] = useState<todoType[]>([])
  const [selectedTodo, setSelectedTodo] = useState<todoType>({} as todoType)
  const [username, setUsername] = useState('')
  const [error, setError] = useState(false)

  const [isPolling, setIsPolling] = useState(false)
  const [intervalId, setIntervalId] = useState<NodeJS.Timer | null>()

  useRefreshToken()

  const fetchAllTodos = async () => {
    try {
      const response = await getAllTodos()
      setTodosList((prevList) => {
        if (isPolling && prevList.length !== response?.data.length) {
          setIsPolling(false)
        }
        return response?.data
      })
      setError(false)
    } catch (error) {
      console.error(error)
      setError(true)
    } finally {
      setIsLoading(false)
    }
  }

  const refetchInterval = () => setInterval(fetchAllTodos, 500)

  useEffect(() => {
    if (isPolling) {
      setIntervalId(refetchInterval())
    } else {
      clearInterval(intervalId as NodeJS.Timer)
    }
    return () => clearInterval(intervalId as NodeJS.Timer)
  }, [isPolling])

  useEffect(() => {
    fetchAllTodos()
  }, [])

  useEffect(() => {
    const username = localStorage.getItem('username') || sessionStorage.getItem('username')
    if (username) setUsername(username)
  }, [])

  const value = {
    isLoading,
    setIsLoading,
    todosList,
    setTodosList,
    username,
    setUsername,
    error,
    setError,
    fetchAllTodos,
    selectedTodo,
    setSelectedTodo,
    setIsPolling,
  }

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
}
