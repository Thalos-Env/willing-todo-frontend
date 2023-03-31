import { useContext } from 'react'
import {
  Modal,
  ModalVariant,
  Button,
  Grid,
  GridItem,
  Switch,
  FormGroup,
} from '@patternfly/react-core'
import { TextInput } from '@patternfly/react-core/dist/esm/components'
import { TodoContext } from '../../contexts/TodoContext'
import { deleteTodo } from '../../services/api'
import { dateToString } from '../../utils/formatDate'
import { todoType } from '../../types/todoType'

interface IModalDeleteTodoProps {
  isModalOpen: boolean
  setIsModalOpen: (isModalOpen: boolean) => void
}

const ModalDeleteTodo = ({ isModalOpen, setIsModalOpen }: IModalDeleteTodoProps) => {
  const { todosList, selectedTodo, setTodosList, setSelectedTodo } = useContext(TodoContext)

  const handleModalToggle = () => {
    setSelectedTodo({} as todoType)
    setIsModalOpen(!isModalOpen)
  }

  const updateOtimistic = () => {
    const newTodosList = todosList.filter((todo) => todo.id !== selectedTodo.id)
    setTodosList(newTodosList)
  }

  const handleDeleteTodo = async () => {
    try {
      await deleteTodo(selectedTodo.id)

      updateOtimistic()
      handleModalToggle()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Modal
        variant={ModalVariant.small}
        title={`Tarefa: ${selectedTodo?.id}`}
        isOpen={isModalOpen}
        onClose={handleModalToggle}
        key={`${selectedTodo?.id}_${selectedTodo?.description}_${selectedTodo?.targetDate}}`}
        actions={[
          <Button key='confirm' variant='danger' onClick={handleDeleteTodo}>
            Deletar
          </Button>,
          <Button key='cancel' variant='link' onClick={handleModalToggle}>
            Cancelar
          </Button>,
        ]}
      >
        <Grid>
          <GridItem span={6}>
            <FormGroup label='Concluído?' fieldId='switch-form-modal'>
              <Switch
                id='switch-form-modal'
                label='Feito!'
                labelOff='Tarefa a fazer'
                isChecked={selectedTodo?.done as boolean}
                hasCheckIcon
                isDisabled
              />
            </FormGroup>
          </GridItem>
          <GridItem span={6}>
            <FormGroup label='Data limite:' fieldId='target-form-modal'>
              <TextInput
                type='text'
                id='target-form-modal'
                placeholder='Data limite da tarefa'
                value={dateToString(new Date(selectedTodo?.targetDate as string))}
                isDisabled
              />
            </FormGroup>
          </GridItem>
          <GridItem span={12}>
            <FormGroup label='Descrição:' fieldId='description-form-modal'>
              <TextInput
                type='text'
                id='description-form-modal'
                placeholder='Descrição da tarefa'
                value={selectedTodo?.description}
                isDisabled
              />
            </FormGroup>
          </GridItem>
        </Grid>
      </Modal>
    </>
  )
}

export default ModalDeleteTodo
