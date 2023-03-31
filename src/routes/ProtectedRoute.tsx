import { Navigate, Outlet } from 'react-router-dom'
import { TodoProvider } from '../contexts/TodoContext'
import { isAuth } from '../services/api'

const ProtectedRoute = ({
  redirectPath = '/',
  children,
}: {
  redirectPath?: string
  children?: React.ReactNode
}) => {
  if (!isAuth()) {
    return <Navigate to={redirectPath} replace />
  }

  const content = children || <Outlet />

  return <TodoProvider>{content}</TodoProvider>
}

export default ProtectedRoute
