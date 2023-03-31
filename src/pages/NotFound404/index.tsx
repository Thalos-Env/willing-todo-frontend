import Footer from '../../components/Footer'
import Header from '../../components/Header'
import { isAuth } from '../../services/api'
import { MonitoringIcon } from '@patternfly/react-icons'
import { Button, EmptyState, EmptyStateIcon, Title } from '@patternfly/react-core'
import { useNavigate } from 'react-router-dom'

const NotFound404 = () => {
  const isLogged = isAuth()
  const navigate = useNavigate()

  document.title = 'Todo App - 404'

  return (
    <div className='page-full-height'>
      <Header isLogged={isLogged} />
      <EmptyState variant='full' className='not-found-container'>
        <EmptyStateIcon icon={MonitoringIcon} />
        <Title headingLevel='h5' size='lg'>
          404 Not Found. O caminho <strong>&apos;{window.location.pathname}&apos; </strong>não foi
          encontrado.
        </Title>
        <Button onClick={() => navigate(isLogged ? '/todos' : '/')}>Voltar para Home</Button>
      </EmptyState>
      <Footer />
    </div>
  )
}

export default NotFound404
