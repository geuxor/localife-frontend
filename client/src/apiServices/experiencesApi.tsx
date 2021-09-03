import axios from 'axios'
import { baseUrl } from '../helpers/helperFunctions'
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
  return await axios.post(`${baseUrl}/search-results`, searchLocation, options)
}

ExperiencesApi.viewExperience = async (experienceId) => {
  return await axios.get(`${baseUrl}/experience/${experienceId}`)
}

ExperiencesApi.getMyExperiences = async () => {
  return await axios.post(`${baseUrl}/experiences/mine`, null, options)
}

ExperiencesApi.deleteExperience = async (experienceId) => {
  return await axios.post(`${baseUrl}/experience/delete`, experienceId, options)
}

ExperiencesApi.updateExperience = async (experienceId) => {
  return await axios.post(`${baseUrl}/experience/update`, experienceId, options)
}

export default ExperiencesApi
