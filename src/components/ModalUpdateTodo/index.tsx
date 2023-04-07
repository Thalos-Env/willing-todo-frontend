import { useState, useEffect, useContext } from 'react'
import {
  Modal,
  ModalVariant,
  Button,
  Grid,
  GridItem,
  Switch,
  FormGroup,
} from '@patternfly/react-core'
import { Alert, TextInput } from '@patternfly/react-core/dist/esm/components'
import { TodoContext } from '../../contexts/TodoContext'
import { updateTodo } from '../../services/api'
import DateTimePicker from '../DateTimePicker'
import { todoType } from '../../types/todoType'

interface IModalUpdateTodoProps {
  isModalOpen: boolean
  setIsModalOpen: (isModalOpen: boolean) => void
}

const ModalUpdateTodo = ({ isModalOpen, setIsModalOpen }: IModalUpdateTodoProps) => {
  const { todosList, selectedTodo, setSelectedTodo, setTodosList } = useContext(TodoContext)

  const today = new Date()
  const [isChecked, setIsChecked] = useState<boolean>()
  const [description, setDescription] = useState('')
  const [targetDate, setTargetDate] = useState('')
  const [showAlert, setShowAlert] = useState(false)

  const [hasDescription, setHasDescription] = useState(true)
  const [isDateValid, setIsDateValid] = useState(true)

  useEffect(() => {
    if (!selectedTodo) return

    setIsChecked(selectedTodo?.done as boolean)
    setDescription(selectedTodo?.description as string)
    setTargetDate(selectedTodo?.targetDate as string)
  }, [selectedTodo, isModalOpen])

  const handleModalToggle = () => {
    setIsDateValid(true)
    setShowAlert(false)
    setTargetDate(today.toISOString())
    setSelectedTodo({} as todoType)
    setDescription('')
    setHasDescription(true)
    setIsModalOpen(!isModalOpen)
  }

  const handleDescriptionChange = (value: string) => {
    setHasDescription(value.length !== 0)
    setDescription(value)
  }

  const validateForm = () => {
    if (!hasDescription || !isDateValid) {
      setShowAlert(true)
    }

    return hasDescription && isDateValid
  }

  const updateOtimistic = (updated: todoType) => {
    const updatedList = todosList.map((todo) => {
      if (todo.id === updated.id) {
        return updated
      }
      return todo
    })

    setTodosList(updatedList)
  }

  const handleEditTodo = async () => {
    if (!validateForm()) return

    const updated = {
      id: selectedTodo?.id,
      description: description,
      targetDate: targetDate,
      username: selectedTodo?.username as string,
      done: isChecked as boolean,
    }

    try {
      await updateTodo(selectedTodo?.id, updated)
      updateOtimistic(updated)
      handleModalToggle()
    } catch (error) {
      console.log(error)
    }
  }

  const handleChangeSwitch = () => setIsChecked(!isChecked)

  const handleChangeDate = (date: string) => {
    setTargetDate(date)
    setIsDateValid(new Date(date) > new Date())
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
          <Button key='confirm' variant='primary' onClick={handleEditTodo}>
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
          <GridItem span={6}>
            <FormGroup label='Concluído?' fieldId='switch-form-modal'>
              <Switch
                id='switch-form-modal'
                label='Feito!'
                labelOff='A fazer'
                isChecked={isChecked}
                onChange={handleChangeSwitch}
                hasCheckIcon
              />
            </FormGroup>
          </GridItem>
          <GridItem span={6}>
            <FormGroup label='Data limite' isRequired fieldId='target-form-modal'>
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
                value={description}
                onChange={handleDescriptionChange}
                validated={hasDescription ? 'default' : 'error'}
              />
            </FormGroup>
          </GridItem>
        </Grid>
      </Modal>
    </>
  )
}

export default ModalUpdateTodo
