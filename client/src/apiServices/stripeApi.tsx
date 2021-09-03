import axios from 'axios'
import { baseUrl } from '../helpers/helperFunctions'
const apiStripe: any = {}
const options: any = {
  // headers: { 'X-Custom-Header': 'value' },
  headers: { 'Content-Type': 'application/json' },
  method: 'post',
  withCredentials: true,
  // xsrfCookieName: 'XSRF-TOKEN',
  // xsrfHeaderName: 'X-XSRF-TOKEN',
}

apiStripe.stripeCheckAccount = async (user) => {
  return await axios.post(`${baseUrl}/stripe/account-status`, user, options)
}

apiStripe.stripeConnectAccount = async (user) => {
  return await axios.post(`${baseUrl}/stripe/connect-account`, user, options)
}

apiStripe.getAccountBalance = async (store) =>
  axios.post(`${baseUrl}/stripe/account-balance`, store, options)

apiStripe.currencyFormatter = (data: any) => {
  console.log('currencyFormatter:', typeof data.currency)

  let result = (data.amount / 100).toLocaleString(data.currency, {
    style: 'currency',
    currency: data.currency,
  })
  return result
}

apiStripe.payoutSetting = async (user) =>
  await axios.post(`${baseUrl}/stripe/payout-setting`, user, options)

apiStripe.getSessionId = async (experience) => {
  const res = await axios.post(`${baseUrl}/stripe/session`, experience, options)
  return res
}

apiStripe.stripeSuccessRequest = async (experienceId) =>
  await axios.post(`${baseUrl}/stripe/success`, experienceId, options)

export default apiStripe
