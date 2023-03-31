import { Routes, Route } from 'react-router-dom'
import Desempenho from '../pages/Desempenho/Desempenho'
import Login from '../pages/Login/Login'
import NotFound404 from '../pages/NotFound404'
import Todos from '../pages/Todos.tsx'
import ProtectedRoute from './ProtectedRoute'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path='/todos' element={<Todos />} />
        <Route path='/desempenho' element={<Desempenho />} />
      </Route>
      <Route path='*' element={<NotFound404 />} />
    </Routes>
  )
}

export default AppRoutes
