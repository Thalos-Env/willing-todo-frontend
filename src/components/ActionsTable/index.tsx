import { Button } from '@patternfly/react-core/dist/esm/components'
import { TrashIcon, PencilAltIcon } from '@patternfly/react-icons'

interface IActionsTableProps {
  onClickEdit: () => void
  onClickDelete: () => void
}

const ActionsTable = ({ onClickEdit, onClickDelete }: IActionsTableProps) => {
  return (
    <>
      <Button isSmall onClick={onClickEdit} className='button-action-table'>
        <PencilAltIcon />
      </Button>
      <Button variant='danger' isSmall onClick={onClickDelete} className='button-action-table'>
        <TrashIcon />
      </Button>
    </>
  )
}

export default ActionsTable
