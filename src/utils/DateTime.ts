import moment from 'moment'

export const getFormattedDate = (date: Date): string =>
  moment(date).format('DD MMM YYYY')
