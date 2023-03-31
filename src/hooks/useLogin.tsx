import { useState, useCallback } from 'react'
import { handleLogin, storageToken } from '../services/api'
import { AxiosError } from 'axios'

export default function useLogin() {
  const [loginSuccess, setLoginSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<number | null>(null)

  const handleSubmit = useCallback(async (username: string, password: string) => {
    setIsLoading(true)
    try {
      const response = await handleLogin(username, password)

      storageToken(response.data.token)
      setLoginSuccess(true)
      setError(null)
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.response?.status as number)
      } else {
        console.log('Unexpected error', err)
      }
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { isLoading, error, handleSubmit, loginSuccess, setError }
}
