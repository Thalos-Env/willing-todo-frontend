import { Button, EmptyState, EmptyStateIcon, Title } from '@patternfly/react-core'
import SearchIcon from '@patternfly/react-icons/dist/esm/icons/search-icon'

const Empty = ({
  setIsModalCreateOpen,
  setSearchInput,
  isSearching,
}: {
  isSearching: boolean
  setSearchInput: (search: string) => void
  setIsModalCreateOpen: (open: boolean) => void
}) => {
  return (
    <EmptyState variant='full'>
      <EmptyStateIcon icon={SearchIcon} />
      <Title headingLevel='h5' size='lg'>
        {!isSearching
          ? 'Lista vazia. Insira novas tarefas.'
          : 'Nenhum resultado encontrado para essa busca.'}
      </Title>
      {!isSearching ? (
        <Button onClick={() => setIsModalCreateOpen(true)}>Criar uma tarefa</Button>
      ) : (
        <Button variant='secondary' onClick={() => setSearchInput('')}>
          Limpar pesquisa
        </Button>
      )}
    </EmptyState>
  )
}

export default Empty
