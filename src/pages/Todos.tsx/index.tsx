import { useContext, useEffect, useState } from 'react'
import { TodoContext } from '../../contexts/TodoContext'

import PageFrame from '../../components/PageFrame'
import TodosTable from '../../components/TodosTable'
import ModalCreateTodo from '../../components/ModalCreateTodo'
import ModalDeleteTodo from '../../components/ModalDeleteTodo'
import ModalUpdateTodo from '../../components/ModalUpdateTodo'
import ToolbarTable from '../../components/ToolbarTable'
import PageLoading from '../../components/PageLoading'
import Empty from '../../components/Empty'
import { Divider } from '@patternfly/react-core'

const Todos = () => {
  const { todosList, isLoading } = useContext(TodoContext)
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false)
  const [isModalUpdateTodo, setIsModalUpdateTodo] = useState(false)
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false)

  const [searchInput, setSearchInput] = useState('')
  const [filteredTodos, setFilteredTodos] = useState(todosList)

  useEffect(() => {
    setFilteredTodos(
      todosList.filter((todo) => {
        return todo.description.toLowerCase().includes(searchInput.toLowerCase())
      }),
    )
  }, [searchInput, isLoading, todosList])

  if (isLoading) return <PageLoading />

  return (
    <PageFrame pageTitle='Tabela de Todos'>
      <ToolbarTable
        isDisabledInput={todosList.length === 0}
        onClickCreate={setIsModalCreateOpen}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
      />
      <Divider />
      {filteredTodos.length !== 0 ? (
        <TodosTable
          key={todosList.length}
          todos={filteredTodos}
          setIsModalUpdateTodo={setIsModalUpdateTodo}
          setIsModalDeleteOpen={setIsModalDeleteOpen}
        />
      ) : (
        <Empty
          isSearching={searchInput.length > 0 || todosList.length !== 0}
          setSearchInput={setSearchInput}
          setIsModalCreateOpen={setIsModalCreateOpen}
        />
      )}
      <ModalUpdateTodo isModalOpen={isModalUpdateTodo} setIsModalOpen={setIsModalUpdateTodo} />
      <ModalDeleteTodo isModalOpen={isModalDeleteOpen} setIsModalOpen={setIsModalDeleteOpen} />
      <ModalCreateTodo isModalOpen={isModalCreateOpen} setIsModalOpen={setIsModalCreateOpen} />
    </PageFrame>
  )
}

export default Todos
