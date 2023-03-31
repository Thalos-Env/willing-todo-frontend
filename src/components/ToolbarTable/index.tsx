import { Toolbar, ToolbarItem, ToolbarContent, Button, SearchInput } from '@patternfly/react-core'

interface IToolbarTableProps {
  onClickCreate: (openModal: boolean) => void
  setSearchInput: (search: string) => void
  searchInput: string
  isDisabledInput: boolean
}

const ToolbarTable = ({
  onClickCreate,
  setSearchInput,
  searchInput,
  isDisabledInput = false,
}: IToolbarTableProps) => {
  return (
    <Toolbar id='toolbar-items' className='toolbar-container'>
      <ToolbarContent>
        <ToolbarItem variant='search-filter'>
          <SearchInput
            aria-label='Pesquise pela descrição'
            placeholder='Pesquise pela descrição'
            className='search-input-todo'
            value={searchInput}
            onChange={(_e, value) => setSearchInput(value)}
            isDisabled={isDisabledInput}
          />
        </ToolbarItem>
        <ToolbarItem>
          <Button
            variant='primary'
            onClick={() => onClickCreate(true)}
            className='button-create-todo'
          >
            Criar tarefa
          </Button>
        </ToolbarItem>
      </ToolbarContent>
    </Toolbar>
  )
}

export default ToolbarTable
