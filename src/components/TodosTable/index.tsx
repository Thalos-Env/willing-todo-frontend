import { useContext, useState } from 'react'
import { TableComposable, Thead, Tr, Th, Tbody, Td, ThProps } from '@patternfly/react-table'
import { todoType } from '../../types/todoType'
import { columnNamesPtBr } from '../../utils/columnNamesPtBr'
import { dateToString } from '../../utils/formatDate'
import ActionsTable from '../ActionsTable'
import { TodoContext } from '../../contexts/TodoContext'
import StatusLabel from '../StatusLabel'

type columnsType = keyof typeof columnNamesPtBr

interface ITodosTableProps {
  todos: todoType[]
  setIsModalUpdateTodo: (openModal: boolean) => void
  setIsModalDeleteOpen: (openModal: boolean) => void
}

const TodosTable = ({ todos, setIsModalUpdateTodo, setIsModalDeleteOpen }: ITodosTableProps) => {
  const { todosList, selectedTodo, setSelectedTodo } = useContext(TodoContext)

  const [activeSortIndex, setActiveSortIndex] = useState<number | null>(null)
  const [activeSortDirection, setActiveSortDirection] = useState<'asc' | 'desc'>()

  const getSortableRowValues = (todo: todoType): [number, Date] => {
    const { id, targetDate } = todo
    return [Number(id), new Date(targetDate)]
  }

  const columnNames = Object.keys(columnNamesPtBr)

  const handleActionClick = (action: 'edit' | 'delete', todoId: string) => {
    setSelectedTodo(todosList.find((todo) => todo.id === todoId) as todoType)
    if (action === 'edit') return setIsModalUpdateTodo(true)
    setIsModalDeleteOpen(true)
  }

  let sortedTodos = [...todos]
  if (activeSortIndex !== null) {
    sortedTodos = todos.sort((a, b) => {
      const aValue = getSortableRowValues(a)[activeSortIndex]
      const bValue = getSortableRowValues(b)[activeSortIndex]

      if (typeof aValue === 'number') {
        if (activeSortDirection === 'asc') {
          return (aValue as number) - (bValue as number)
        }
        return (bValue as number) - (aValue as number)
      } else {
        if (activeSortDirection === 'asc') {
          return (aValue as Date).getTime() - (bValue as Date).getTime()
        }
        return (bValue as Date).getTime() - (aValue as Date).getTime()
      }
    })
  }

  const getSortParams = (columnIndex: number): ThProps['sort'] => ({
    sortBy: {
      index: activeSortIndex as number,
      direction: activeSortDirection,
      defaultDirection: 'desc',
    },
    onSort: (_event, index, direction) => {
      setActiveSortIndex(index)
      setActiveSortDirection(direction)
    },
    columnIndex,
  })

  const thSort = (column: string) => {
    if (column === 'id') return getSortParams(0)
    if (column === 'targetDate') return getSortParams(1)
    return undefined
  }

  return (
    <>
      <TableComposable aria-label='Tabela de tarefas' variant={'compact'} borders isStickyHeader>
        <Thead>
          <Tr>
            {columnNames.map((column) => (
              <Th key={column} textCenter sort={thSort(column)}>
                {columnNamesPtBr[column as columnsType]}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody key={`t-body-${activeSortDirection}`}>
          {sortedTodos.map((todo) => (
            <Tr key={todo.id} className={selectedTodo.id === todo.id ? 'table-tr-selected' : ''}>
              <Td dataLabel={'ID'} textCenter>
                {todo.id}
              </Td>
              <Td dataLabel={'Status'} textCenter>
                <StatusLabel isDone={todo.done} date={new Date(todo.targetDate)} />
              </Td>

              <Td dataLabel={'Descrição'} textCenter>
                {todo.description}
              </Td>
              <Td dataLabel={'Data limite'} textCenter>
                {dateToString(new Date(todo.targetDate))}
              </Td>
              <Td dataLabel={'Username'} textCenter>
                {todo.username}
              </Td>
              <Td dataLabel={'Ações'} textCenter>
                <ActionsTable
                  onClickEdit={() => handleActionClick('edit', todo.id)}
                  onClickDelete={() => handleActionClick('delete', todo.id)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </TableComposable>
    </>
  )
}

export default TodosTable
