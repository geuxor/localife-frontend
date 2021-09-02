import { ExperienceInterface } from '../types/types'

export function filterExpById(array, id): ExperienceInterface {
  let res

  array.forEach((item) => {
    if (item.id === id) res = item
  })
  return res
}

export function setEndpoint(): any {
  if (process.env.API_DOMAIN === 'development') {
    return process.env.REACT_APP_API_DEV
  } else {
    return process.env.REACT_APP_API_HEROKU
  }
}
