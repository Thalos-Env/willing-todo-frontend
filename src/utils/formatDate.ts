export const dateToString = (date: Date) => {
  return date.toLocaleString('pt-BR', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
    timeZone: 'America/Sao_Paulo',
  })
}

export const stringToDate = (date: string) => {
  const inputDate = new Date(date)
  const offset = new Date().getTimezoneOffset()
  const brDate = new Date(inputDate.getTime() - offset * 60 * 1000 + 3 * 60 * 60 * 1000)

  return brDate
}

export const differenceInHours = (date: Date) => {
  const now = new Date()
  const diff = date.getTime() - now.getTime()
  return Math.ceil(diff / (1000 * 3600))
}
