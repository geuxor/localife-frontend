import { useEffect } from 'react'
// import Spinner from '../components/Spinner/Spinner'
import { toast } from 'react-toastify'
import { useHistory } from 'react-router-dom'
import Heart from '../components/Spinner/Heart.Spinner'
import apiStripe from '../apiServices/stripeApi'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../redux/actions/actions'

const StripeRedirect = () => {
  console.log('StripeRedirect: check onboarding completed?')
  const store = useSelector((state) => state)
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    ;(async () => {
      try {
        let res = await apiStripe.stripeCheckAccount(store.user)
        console.log('Redirect: res from stripeCheckAccount', res.data)
        if (res.data === 'COMPLETE') {
          dispatch(
            setUser({ ...store.user, stripe_registration_complete: res.data }),
          )
          console.log('ready to go dashboarding')
          history.push('/dashboard')
        }
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
          history.push('/become-provider')
        } else {
          console.log('StripeRedirect err data:', err.message.data)
        }
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const color = '#e4a700'
  const size = '86px'

  return (
    <div className="container d-flex justify-content-center p-5">
      <div className="m-5 p-5">
        <Heart color={color} size={size} />
      </div>{' '}
    </div>
  )
}

export default StripeRedirect
