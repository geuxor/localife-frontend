import axios from 'axios'
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
  return await axios.post(
    `${process.env.REACT_APP_API}/stripe/account-status`,
    user,
    options,
  )
}

apiStripe.stripeConnectAccount = async (user) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/stripe/connect-account`,
    user,
    options,
  )
}

//func => axios.post does a return - but if no {} no return
//func => { return axios.post } - return needed
apiStripe.getAccountStatus = async (token) => {
  return axios.post(
    `${process.env.REACT_APP_API}/get-account-status`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
}

apiStripe.getAccountBalance = async (store) =>
  axios.post(
    `${process.env.REACT_APP_API}/stripe/account-balance`,
    store,
    options,
  )

apiStripe.currencyFormatter = (data) => {
  console.log('stripeApi:', data)
  return (data.amount / 100).toLocaleString(data.currency, {
    style: 'currency',
    currency: data.currency,
  })
}

apiStripe.payoutSetting = async (user) =>
  await axios.post(
    `${process.env.REACT_APP_API}/stripe/payout-setting`,
    user,
    options,
  )

apiStripe.getSessionId = async (experience) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API}/stripe/session`,
    experience,
    options,
  )
  return res
}

apiStripe.stripeSuccessRequest = async (experienceId) =>
  await axios.post(
    `${process.env.REACT_APP_API}/stripe/success`,
    experienceId,
    options,
  )

export default apiStripe
