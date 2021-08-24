import { useEffect } from 'react'
// import Spinner from '../components/Spinner/Spinner'
import { toast } from 'react-toastify'
import { useHistory } from 'react-router-dom'
import Heart from '../components/Spinner/Heart.Spinner'
import apiStripe from '../apiServices/stripeApi'
import { useDispatch, useSelector } from 'react-redux'

const StripeRedirect = () => {
  console.log('StripeRedirect: onboarding completed')
  const store = useSelector((state) => state)
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    ;(async () => {
      try {
        //check db to check account status to see if provider is now enabled
        let res = await apiStripe.stripeCheckAccount(store.user)
        console.log('Redirect: res from stripeCheckAccount', res.data)
        if (res.data === 'COMPLETE') {
          dispatch({
            type: 'SET_USER',
            payload: { stripe_registration_complete: res.data },
          })
          console.log('ready to go dashboarding')
          // history.push('./dashboard')
        }

        // if (res.data !== 'No Stripe account found') {
        // dispatch({
        //   type: 'SET_USER',
        //   payload: { stripe_registration_complete: res.data },
        // })
        // }

        //backend save it to db and res=enabled
        //if enabled
        //remove Become provider from navbar
        //redirect to dashboard
        // console.log('StripeRedirect: fetching profile')
        // const sid = get_cookie()
        // console.log('StripeRedirect: read the cookie:', sid)
        // if (sid) {
        // history.push('/dashboard')
        // }
      } catch (err) {
        if (err.response && err.response.status >= 400) {
          console.log('StripeRedirect err res:', err.response.data)
          if (err.response.data === 'No Stripe account found') {
            toast.err('No Stripe account found')
          }
          let missingRequirements = err.response.data.split(',')
          console.log(missingRequirements)
          if (missingRequirements) {
            toast.error('Still Missing Onboarding Requirements')
            let stripeReqs = []
            missingRequirements.forEach((el) => {
              stripeReqs.push(
                el.replace(/[._\s]/g, ' ').replace(/\b\w/g, function (c) {
                  return c.toUpperCase()
                }),
              )
            })
            console.log('stripeReqs', stripeReqs)
            dispatch({
              type: 'SET_STRIPE',
              payload: { missingRequirements: stripeReqs },
            })
          }
          // history.push('/become-provider')
        } else {
          console.log('StripeRedirect err data:', err.message.data)
        }
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
