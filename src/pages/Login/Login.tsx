import { useState, useEffect } from 'react'

import { FormGroup } from '@patternfly/react-core'
import { Alert, Button, Spinner, TextInput } from '@patternfly/react-core/dist/esm/components'
import { useNavigate } from 'react-router-dom'
import useLogin from '../../hooks/useLogin'

import Logo from '../../components/Logo'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { isAuth } from '../../services/api'

const Login = () => {
  const { isLoading, error, handleSubmit, loginSuccess, setError } = useLogin()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [keepLogged, setKeepLogged] = useState(false)
  const [alertRequiredFields, setAlertRequiredFields] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuth()) return
    navigate('/todos')
  }, [loginSuccess])

  const handleClickLogin = async () => {
    if (!username || !password) {
      setAlertRequiredFields(true)
      return
    }
    setAlertRequiredFields(false)
    localStorage.setItem('keepLogged', keepLogged.toString())
    handleSubmit(username, password)
    setError(null)
  }

  const handleChangeCheckbox = () => {
    setKeepLogged(!keepLogged)
  }

  return (
    <>
      <div className='page-login'>
        <Header />
        <div className='card-login'>
          <div className='card-login__header'>
            <Logo fill='#22455B' />
          </div>
          <div className='card-login__title full-width'>
            <h1 className=''>Login</h1>
          </div>
          <FormGroup label='Username' isRequired fieldId='username-form-login'>
            <TextInput
              isRequired
              type='text'
              id='username-form-login'
              placeholder='Digite seu username'
              value={username}
              onChange={setUsername}
            />
          </FormGroup>
          <FormGroup label='Senha' isRequired fieldId='password-form-login'>
            <TextInput
              isRequired
              type='password'
              id='password-form-login'
              placeholder='Digite sua senha'
              value={password}
              onChange={setPassword}
            />
          </FormGroup>
          <div className='checkbox-container'>
            <input
              type='checkbox'
              id='keep-logged'
              name='keep-logged'
              value={+keepLogged}
              onChange={handleChangeCheckbox}
            />
            <label htmlFor='keep-logged'>Mantenha-me conectado</label>
          </div>
          <Button
            className='full-width button-container'
            variant='primary'
            onClick={handleClickLogin}
          >
            {isLoading && <Spinner size='md' isSVG className='spinner-loading-button' />}
            <p className='ml-10'>Entrar</p>
          </Button>
        </div>
        <div className='container-alert'>
          {error === 401 && (
            <Alert
              className='alert-login-error'
              tooltipPosition='top'
              variant='danger'
              title='Credenciais inválidas!'
            >
              Verifique seu username e senha.
            </Alert>
          )}
          {alertRequiredFields && (
            <Alert
              className='alert-login-error'
              tooltipPosition='top'
              variant='danger'
              title='Campos obrigatórios!'
            >
              Preencha os campos de username e senha.
            </Alert>
          )}
          {!!loginSuccess && <p>Login feito com sucesso</p>}
        </div>
        <Footer />
      </div>
    </>
  )
}

export default Login
