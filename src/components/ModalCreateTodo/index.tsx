import { useContext, useState } from 'react'
import { Modal, ModalVariant, Button, Grid, GridItem, FormGroup } from '@patternfly/react-core'
import { Alert, TextInput } from '@patternfly/react-core/dist/esm/components'
import { TodoContext } from '../../contexts/TodoContext'
import { createTodo } from '../../services/api'
import DateTimePicker from '../DateTimePicker'

interface IModalCreateTodoProps {
  isModalOpen: boolean
  setIsModalOpen: (isModalOpen: boolean) => void
}

const ModalCreateTodo = ({ isModalOpen, setIsModalOpen }: IModalCreateTodoProps) => {
  const { setIsPolling } = useContext(TodoContext)

  const today = new Date()
  const [description, setDescription] = useState<string | null>(null)
  const [targetDate, setTargetDate] = useState(today.toISOString())
  const [showAlert, setShowAlert] = useState(false)

  const [hasDescription, setHasDescription] = useState(false)
  const [isDateValid, setIsDateValid] = useState(true)

  const handleModalToggle = () => {
    setShowAlert(false)
    setTargetDate(today.toISOString())
    setDescription(null)
    setHasDescription(false)
    setIsModalOpen(!isModalOpen)
  }

  const handleDescriptionChange = (value: string) => {
    setHasDescription(value.length !== 0)
    setDescription(value)
    setShowAlert(false)
  }

  const validateForm = () => {
    if (!hasDescription || !isDateValid) {
      setDescription('')
      setShowAlert(true)
    }

    return hasDescription && isDateValid
  }

  const handleCreateTodo = async () => {
    if (!validateForm()) return

    const newTodo = {
      description: description as string,
      targetDate: targetDate,
      done: false,
    }

    try {
      await createTodo(newTodo)

      setIsPolling(true)
      handleModalToggle()
    } catch (error) {
      console.log(error)
    }
  }

  const handleChangeDate = (date: string) => {
    setTargetDate(date)
    setIsDateValid(new Date(date) > new Date())
    setShowAlert(false)
  }

  return (
    <>
      <Modal
        variant={ModalVariant.small}
        title={'Criar nova tarefa'}
        isOpen={isModalOpen}
        onClose={handleModalToggle}
        actions={[
          <Button key='confirm' variant='primary' onClick={handleCreateTodo}>
            Salvar
          </Button>,
          <Button key='cancel' variant='link' onClick={handleModalToggle}>
            Cancelar
          </Button>,
        ]}
      >
        <Grid hasGutter>
          {showAlert && (
            <GridItem span={12}>
              <Alert variant='danger' title='Verifique os campos da tarefa.' isInline />
            </GridItem>
          )}
          <GridItem span={12}>
            <FormGroup label='Para quando?' fieldId='target-form-modal'>
              <DateTimePicker
                value={targetDate}
                onChange={handleChangeDate}
                id='target-form-modal'
                isDateValid={isDateValid}
              />
            </FormGroup>
          </GridItem>
          <GridItem span={12}>
            <FormGroup label='Descrição' isRequired fieldId='description-form-modal'>
              <TextInput
                isRequired
                type='text'
                id='description-form-modal'
                placeholder='Descrição da tarefa'
                value={description !== null ? description : ''}
                onChange={handleDescriptionChange}
                validated={hasDescription || description === null ? 'default' : 'error'}
              />
            </FormGroup>
          </GridItem>
        </Grid>
      </Modal>
    </>
  )
}

export default ModalCreateTodo
