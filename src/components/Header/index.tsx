import { Avatar, Button } from '@patternfly/react-core'
import imgAvatar from '@patternfly/react-core/src/components/Avatar/examples/avatarImg.svg'
import BarsMenu from '../Icons/BarsMenu'
import Logo from '../Logo'
import { goToLogin } from '../../routes/redirects'
import { logout } from '../../services/api'
import { useNavigate } from 'react-router-dom'

interface IHeaderProps {
  navToggle?: () => void
  isLogged?: boolean
}

const Header = ({ navToggle, isLogged }: IHeaderProps) => {
  const navigate = useNavigate()

  return (
    <div className='header full-width'>
      <div className='header-container-logo'>
        {!!navToggle && isLogged && <BarsMenu onClick={navToggle} height='2rem' width='2rem' />}
        <Logo onClick={() => navigate(isLogged ? '/todos' : '/')} />
      </div>
      <div className='header-avatar-login'>
        <Avatar src={imgAvatar} alt='Avatar' size='md' />

        {isLogged ? (
          <Button onClick={() => logout()} className='header-button'>
            Sair
          </Button>
        ) : (
          <Button onClick={() => goToLogin()} className='header-button'>
            LOGIN
          </Button>
        )}
      </div>
    </div>
  )
}

export default Header
