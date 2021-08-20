import axios from 'axios'
const ExperiencesApi: any = {}

const options: any = {
  headers: { 'Content-Type': 'application/json' },
  method: 'post',
}

ExperiencesApi.searchExperiencesApi = async (searchLocation) => {
  const options: any = {
    headers: { 'Content-Type': 'application/json' },
    method: 'post',
  }
  try {
    const res = await axios.post(
      'http://localhost:4001/search-results',
      searchLocation,
      options,
    )
    console.log('API response ===>', res.data)
    return res.data
  } catch (err) {
    console.log(err)
  }
}

ExperiencesApi.viewExperience = async (experienceId) => {
  return await axios.get(
    `${process.env.REACT_APP_API}/experience/${experienceId}`,
  )
}

export default ExperiencesApi
