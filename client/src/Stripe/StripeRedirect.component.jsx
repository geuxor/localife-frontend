import { useEffect } from 'react'
// import Spinner from '../components/Spinner/Spinner'
import { toast } from 'react-toastify'
import { get_cookie } from '../utils/cookieHandler'
import { useHistory } from 'react-router-dom'
import Heart from '../components/Spinner/Heart.Spinner'
const StripeRedirect = () => {
  console.log('StripeRedirect: onboarding completed')
  const history = useHistory()

  useEffect(() => {
    ;(async () => {
      try {
        //check db to check account status to see if provider is now enabled
        //backend save it to db and res=enabled
        //if enabled
        //
        //remove Become provider from navbar
        //redirect to dashboard
        // console.log('StripeRedirect: fetching profile')
        // const sid = get_cookie()
        // console.log('StripeRedirect: read the cookie:', sid)
        // if (sid) {
        history.push('/dashboard')
        // }
      } catch (err) {
        console.log('StripeRedirect:', err)
        if (err.response && err.response.status >= 400)
          toast.error(err.response.data)
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //call stripe.js and then backend
  // const res = await apiStripe.getAccountStatus(auth.token);
  // console.log("USER ACCOUNT STATUS ON STRIPE Redirect", res);
  const color = '#e4a700'
  const size = '86px'

  return <Heart color={color} size={size} />
}

export default StripeRedirect
