import axios from 'axios'
import { baseUrl } from '../helpers/helperFunctions'
const apiAuth = {}
const options = {
  headers: { 'Content-Type': 'application/json' },
  method: 'post',
  withCredentials: true,
}

apiAuth.registerUser = async (user) => {
  return await axios.post(`${baseUrl}/register`, user)
}

apiAuth.loginUser = async (user) => {
  return await axios.post(`${baseUrl}/login`, user, options)
}

apiAuth.logout = async () => {
  return await axios.get(`${baseUrl}/logout`)
}

apiAuth.getProfile = async (sid) => {
  return await axios.post(`${baseUrl}/profile`, null, options)
}

export default apiAuth
