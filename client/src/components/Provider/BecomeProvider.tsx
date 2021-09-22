import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import apiStripe from '../../apiServices/stripeApi'
import { toast } from 'react-toastify'
import { RootState } from '../../redux/reducers/reducers'
import Heart from '../Spinner/Heart.Spinner'
import { useHistory } from 'react-router'

function BecomeProvider(props) {
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState<boolean>(true)
  const store = useAppSelector((state: RootState) => state)
  const [missingStripeRequirements, setMissingStripeRequirements] = useState([])
  const history = useHistory()

  useEffect(() => {
    ;(async () => {
      try {
        if (store.user.stripe_registration_complete === 'COMPLETED')
          history.push('./dashboard')
        if (store.stripe.missingRequirements)
          setMissingStripeRequirements(store.stripe.missingRequirements)
        setLoading(false)
      } catch (err: any) {
        if (err.response && err.response.data.length < 100) {
          let fields_req = err.response.data.split(',')
          setMissingStripeRequirements(fields_req)
          toast.error(err.response.data)
        } else {
          if (err.response) {
            toast.error(
              `${err.response.statusText} Stripe check failed. Please Refresh your browser and relogin.`,
            )
          } else {
            console.log(err)
          }
        }
        setLoading(false)
      }
    })()
  }, [])

  const handleClick = async () => {
    setLoading(true)
    try {
      let res = await apiStripe.stripeConnectAccount(store.user)
      window.location.href = res.data
    } catch (err: any) {
      if (err.response.data && err.response.data.length < 100) {
        toast.error(err.response.data)
      } else {
        toast.error(
          `${err.response.statusText} Token- Stripe connect failed. Please Refresh your browser and Try again.`,
        )
      }
      setLoading(false)
    }
  }

  const notConnected = () => (
    <div className="row">
      <div className="col-12 offset-md-1 text-left">
        <div className="p-2">
          <div className="d-flex justify-content-around">
            <h1>
              <i className="fas fa-plug"></i>
            </h1>
            <h4> Setup Payouts to create new Products</h4>
          </div>
          <p className="lead">
            <b>Localife</b> partners with Stripe to transfer your earnings to
            your bank account You'll be redirected to Stripe's official platform
            to complete the process.
            <br />
            Once this has been completed you would be able to add new products
            and start selling!
          </p>
          <h5>
            <br />
            Before you start your Government requires the following information:
          </h5>
          <div className="text-muted">
            <ul>
              {missingStripeRequirements.length > 0 ? (
                missingStripeRequirements.map((value, index) => {
                  return <li key={index}>{value}</li>
                })
              ) : (
                <>
                  <li>Name</li>
                  <li>Address</li>
                  <li>Contact Details</li>
                  <li>Bank Account where you will receive payments</li>
                  <li>Proof of ID and Address</li>
                </>
              )}
            </ul>
          </div>
          <button
            disabled={loading}
            onClick={handleClick}
            className="btn btn-primary mb-3"
          >
            {loading ? 'Processing...' : 'Setup Payouts Now'}
          </button>
          <br />
          <small>the whole process takes between 5-10 minutes</small>
        </div>
      </div>
    </div>
  )

  const color = '#e4a700'
  const size = '86px'

  return (
    <>
      <div className="container d-flex justify-content-center p-5">
        {loading ? (
          <div className="m-5 p-5">
            <Heart color={color} size={size} />
          </div>
        ) : (
          store.user.stripe_registration_complete !== 'COMPLETED' &&
          notConnected()
        )}
      </div>
    </>
  )
}

export default BecomeProvider
