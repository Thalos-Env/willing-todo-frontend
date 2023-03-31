import { useContext } from 'react'
import { Button, Title } from '@patternfly/react-core'
import { MonitoringIcon } from '@patternfly/react-icons'

import Plot from 'react-plotly.js'
import PageFrame from '../../components/PageFrame'
import { TodoContext } from '../../contexts/TodoContext'
import { todoType } from '../../types/todoType'
import { differenceInHours } from '../../utils/formatDate'
import { useNavigate } from 'react-router-dom'

const Desempenho = () => {
  const { todosList } = useContext(TodoContext)
  const navigate = useNavigate()

  const [doneList, lateList, attentionList, otherList] = [
    [] as todoType[],
    [] as todoType[],
    [] as todoType[],
    [] as todoType[],
  ]

  todosList.forEach((todo) => {
    if (todo.done) {
      doneList.push(todo)
      return
    }

    const diff = differenceInHours(new Date(todo.targetDate))

    if (diff <= 0) {
      lateList.push(todo)
    } else if (diff < 24) {
      attentionList.push(todo)
    } else {
      otherList.push(todo)
    }
  })

  return (
    <PageFrame pageTitle='Desempenho'>
      {todosList.length === 0 ? (
        <div className='full-width box-no-data-to-plot'>
          <MonitoringIcon size='lg' />
          <Title headingLevel='h2' size='lg'>
            Sem tarefas para análisar.{' '}
          </Title>
          <p>Crie novas tarefas para gerar o gráfico.</p>
          <Button onClick={() => navigate('/todos')}>Criar tarefa</Button>
        </div>
      ) : (
        <Plot
          data={[
            {
              type: 'bar',
              x: ['Concluído'],
              y: [doneList.length],
              name: 'Concluído',
              marker: {
                color: ['rgb(149 213 142)'],
              },
            },
            {
              type: 'bar',
              x: ['Atrasado'],
              y: [lateList.length],
              name: 'Atrasado',
              marker: {
                color: ['rgba(222,45,38,0.8)'],
              },
            },
            {
              type: 'bar',
              x: ['Atenção'],
              y: [attentionList.length],
              name: 'Atenção (até 24h)',
              marker: {
                color: ['rgb(244 193 69)'],
              },
            },
            {
              type: 'bar',
              x: ['A fazer'],
              y: [otherList.length],
              name: 'A fazer (mais de 24h)',
              marker: {
                color: ['rgb(115 188 247)'],
              },
            },
          ]}
          layout={{ title: 'Status das tarefas', yaxis: { title: 'Quantidade' } }}
          config={{ responsive: true }}
        />
      )}
    </PageFrame>
  )
}

export default Desempenho
