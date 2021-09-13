import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useHistory } from 'react-router-dom'
import Heart from '../components/Spinner/Heart.Spinner'
import apiStripe from '../apiServices/stripeApi'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../redux/actions/actions'

const StripeRedirect = () => {
  const store = useSelector((state) => state)
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    ;(async () => {
      try {
        let res = await apiStripe.stripeCheckAccount(store.user)
        if (res.data === 'COMPLETE') {
          dispatch(
            setUser({ ...store.user, stripe_registration_complete: res.data }),
          )
          history.push('/dashboard')
        }
      } catch (err) {
        if (err.response && err.response.status >= 400) {
          if (err.response.data === 'No Stripe account found') {
            toast.err('No Stripe account found')
          }
          let missingRequirements = err.response.data.split(',')
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
            dispatch({
              type: 'SET_STRIPE',
              payload: { missingRequirements: stripeReqs },
            })
          }
          history.push('/become-provider')
        } else {
        }
      }
    })()
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
