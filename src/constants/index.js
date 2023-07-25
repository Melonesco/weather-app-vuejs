import moment from 'moment'

export const API_KEY = '4a65dfbf94aefd79b9979fd80645a114'
export const BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast'

export const getTime = (timestamp) => moment(timestamp, 'YYYY-MM-DD HH:mm:ss').format('HH:mm')
export const getWeekday = (timestamp) => moment(timestamp, 'YYYY-MM-DD HH:mm:ss').format('dddd')
export const getMonth = (timestamp) => moment(timestamp, 'YYYY-MM-DD HH:mm:ss').format('D MMMM')
