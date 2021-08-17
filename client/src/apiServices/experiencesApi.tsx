import axios from 'axios'
const ExperiencesApi: any = {}

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

export default ExperiencesApi
