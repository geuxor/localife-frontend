import axios from 'axios'
const ExperiencesApi: any = {}

const options: any = {
  headers: { 'Content-Type': 'application/json' },
  method: 'post',
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

export default ExperiencesApi
