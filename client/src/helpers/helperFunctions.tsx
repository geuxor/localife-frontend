import { ExperienceInterface } from '../types/types'

export function filterExpById(array, id): ExperienceInterface {
  let res

  array.forEach((item) => {
    if (item.id === id) res = item
  })
  return res
}
