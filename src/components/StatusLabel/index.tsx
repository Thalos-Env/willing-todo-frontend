import { Label, Tooltip } from '@patternfly/react-core'
import InfoCircleIcon from '@patternfly/react-icons/dist/esm/icons/info-circle-icon'
import { CheckCircleIcon } from '@patternfly/react-icons'
import { differenceInHours } from '../../utils/formatDate'

const StatusLabel = ({ date, isDone }: { date: Date; isDone?: boolean }) => {
  if (isDone)
    return (
      <Tooltip content={<p>Parabéns, você concluiu esta tarefa!</p>}>
        <Label color='green' icon={<CheckCircleIcon />}>
          Feito!
        </Label>
      </Tooltip>
    )

  const diff = differenceInHours(date)

  if (diff <= 0)
    return (
      <Tooltip content={<p>Atenção, você está atrasado para concluir esta tarefa!</p>}>
        <Label color='red' icon={<InfoCircleIcon />}>
          Atrasado
        </Label>
      </Tooltip>
    )
  if (diff < 24)
    return (
      <Tooltip
        content={<p>Atenção, você tem apenas cerca de {diff} horas para concluir esta tarefa!</p>}
      >
        <Label color='gold' icon={<InfoCircleIcon />}>
          Atenção
        </Label>
      </Tooltip>
    )
  return (
    <Label color='blue' icon={<InfoCircleIcon />}>
      A fazer
    </Label>
  )
}

export default StatusLabel
