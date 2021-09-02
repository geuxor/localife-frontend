import axios from 'axios'
import { setEndpoint } from '../helpers/helperFunctions'
const ExperiencesApi: any = {}

const options: any = {
  // headers: { 'X-Custom-Header': 'value' },
  headers: { 'Content-Type': 'application/json' },
  method: 'post',
  withCredentials: true,
  // xsrfCookieName: 'XSRF-TOKEN',
  // xsrfHeaderName: 'X-XSRF-TOKEN',
}

ExperiencesApi.searchExperiencesApi = async (searchLocation) => {
  return await axios.post(
    `${setEndpoint}/search-results`,
    searchLocation,
    options,
  )
}

ExperiencesApi.viewExperience = async (experienceId) => {
  return await axios.get(`${setEndpoint}/experience/${experienceId}`)
}

ExperiencesApi.getMyExperiences = async () => {
  return await axios.post(`${setEndpoint}/experiences/mine`, null, options)
}

ExperiencesApi.deleteExperience = async (experienceId) => {
  return await axios.post(
    `${setEndpoint}/experience/delete`,
    experienceId,
    options,
  )
}

ExperiencesApi.updateExperience = async (experienceId) => {
  return await axios.post(
    `${setEndpoint}/experience/update`,
    experienceId,
    options,
  )
}

export default ExperiencesApi
