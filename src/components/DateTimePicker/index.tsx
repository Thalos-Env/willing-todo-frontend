import { stringToDate } from '../../utils/formatDate'

interface IDateTimePickerProps {
  value?: string
  onChange?: (date: string) => void
  id: string
  isDateValid: boolean
}

const dateFormat = (date: Date) => {
  const day = date.getDate().toString()
  const month = (date.getMonth() + 1).toString()
  const year = date.getFullYear().toString()
  const hours = date.getHours().toString()
  const minutes = date.getMinutes().toString()

  return `${year.padStart(4, '0')}-${month.padStart(2, '0')}-${day.padStart(
    2,
    '0',
  )}T${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`
}

const DateTimePicker = ({ value, onChange, id, isDateValid }: IDateTimePickerProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e.target.value)
  }

  const valueDate = value ? dateFormat(stringToDate(value)) : dateFormat(new Date())

  return (
    <input
      id={id}
      type='datetime-local'
      defaultValue={valueDate}
      onInput={handleChange}
      min={dateFormat(new Date())}
      pattern='[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}'
      className={`full-width ${isDateValid ? '' : 'input-datetime-invalid'}`}
    />
  )
}

export default DateTimePicker
