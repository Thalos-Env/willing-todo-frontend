import { useCallback, useEffect } from 'react'
import { refreshToken, storageToken } from '../services/api'

const FIVE_MINUTES_IN_SECONDS = 60 * 5
const INTERVAL_IN_MINUTES = 1000 * 60 * 5

export default function useRefreshToken() {
  const refresh = useCallback(async () => {
    try {
      const response = await refreshToken()
      storageToken(response?.data.token)
    } catch (err) {
      console.log(err)
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      const tokenExpirationTimeInSeconds = Number(
        localStorage.getItem('useExp') || sessionStorage.getItem('userExp'),
      )
      const nowInSeconds = Math.floor(Date.now() / 1000)
      const timeToExpire = tokenExpirationTimeInSeconds - nowInSeconds

      if (timeToExpire < FIVE_MINUTES_IN_SECONDS) {
        refresh()
      }
    }, INTERVAL_IN_MINUTES)

    return () => clearInterval(interval)
  }, [])
}
