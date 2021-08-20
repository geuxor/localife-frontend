import { useEffect } from 'react'
import DesignSpin from '../Design/Spin.component'
import { toast } from 'react-toastify'
import { get_cookie } from '../../utils/cookieHandler'
import { useHistory } from 'react-router-dom'

const StripeCallback = () => {
  console.log('StripeCallback: onboarding completed')
  const history = useHistory()

  useEffect(() => {
    ;(async () => {
      try {
        console.log('StripeCallback: fetching profile')
        const sid = get_cookie()
        console.log('StripeCallback: read the cookie:', sid)
        if (sid) {
          history.push('/dashboard')
        }
      } catch (err) {
        console.log('StripeCallback:', err)
        if (err.response && err.response.status >= 400)
          toast.error(err.response.data)
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //call stripe.js and then backend
  // const res = await apiStripe.getAccountStatus(auth.token);
  // console.log("USER ACCOUNT STATUS ON STRIPE CALLBACK", res);

  return <DesignSpin message={'Checking if Stripe is ready...'} />
}

export default StripeCallback
