import axios from 'axios'
import { setEndpoint } from '../helpers/helperFunctions'
const apiAuth = {}
const options = {
  // headers: { 'X-Custom-Header': 'value' },
  headers: { 'Content-Type': 'application/json' },
  method: 'post',
  withCredentials: true,
  // xsrfCookieName: 'XSRF-TOKEN',
  // xsrfHeaderName: 'X-XSRF-TOKEN',
}

apiAuth.registerUser = async (user) => {
  return await axios.post(`${setEndpoint}/register`, user)
}

apiAuth.loginUser = async (user) => {
  return await axios.post(`${setEndpoint}/login`, user, options)
}

apiAuth.logout = async () => {
  return await axios.get(`${setEndpoint}/logout`)
}

apiAuth.getProfile = async (sid) => {
  return await axios.post(`${setEndpoint}/profile`, null, options);
};

export default apiAuth
