import { ExperienceInterface } from '../types/types'

export function filterExpById(array, id): ExperienceInterface {
  let res

  array.forEach((item) => {
    if (item.id === id) res = item
  })
  return res
}

export const baseUrl =
  process.env.REACT_APP_API_DOMAIN === 'development'
    ? process.env.REACT_APP_API_DEV
    : process.env.REACT_APP_API_HEROKU
