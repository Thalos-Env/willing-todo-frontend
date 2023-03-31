import { Spinner } from '@patternfly/react-core'

const PageLoading = () => {
  return (
    <div className='page-loading'>
      <div className='loading text-align-center'>
        <Spinner size='xl' isSVG />
        <p>Aguarde enquanto estamos carregando os dados...</p>
      </div>
    </div>
  )
}

export default PageLoading
