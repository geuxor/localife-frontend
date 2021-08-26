import axios from 'axios'
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
    `${process.env.REACT_APP_API}/search-results`,
    searchLocation,
    options,
  )
}

ExperiencesApi.viewExperience = async (experienceId) => {
  return await axios.get(
    `${process.env.REACT_APP_API}/experience/${experienceId}`,
  )
}

ExperiencesApi.getMyExperiences = async () => {
  return await axios.post(
    `${process.env.REACT_APP_API}/experiences/mine`,
    null,
    options,
  )
}

ExperiencesApi.deleteExperience = async (experienceId) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/experience/delete`,
    experienceId,
    options,
  )
}

ExperiencesApi.updateExperience = async (experienceId) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/experience/update`,
    experienceId,
    options,
  )
}

export default ExperiencesApi
