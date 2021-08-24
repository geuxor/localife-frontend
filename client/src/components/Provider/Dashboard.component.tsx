import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import apiStripe from '../../apiServices/stripeApi'
import { toast } from 'react-toastify'
import SpinIcon from '../../components/Design/Spin.component'
import { RootState } from '../../redux/reducers/reducers'
import Heart from '../Spinner/Heart.Spinner'
import { useHistory } from 'react-router'

function Dashbaord(props) {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const store = useSelector((state: RootState) => state)
  const [missingRequirements, setMissingRequirements] = useState([])
  const history = useHistory()

  useEffect(() => {
    ;(async () => {
      try {
        console.log('Dashbaord: checking stripe conx for', store.user)
        //if user already register redirect to dashboard
        if (store.user.stripe_registration_complete) history.push('./dashboard')
        //otherwise get stripe accound details
        let res = await apiStripe.stripeCheckAccount(store.user)
        console.log('Dashbaord: res from stripeCheckAccount', res.data)
        if (res.data !== 'No Stripe account found') {
          // dispatch({
          //   type: 'SET_STRIPE',
          //   payload: { stripe: res.data },
          // })
        }
        // if (!store.stripe.hasOwnProperty('stripe_account_id')) {
        //   console.log('store .stripe true', store.stripe.stripe_account_id)
        // }
        // setLoading(false)
      } catch (err) {
        if (err.response && err.response.data.length < 100) {
          let fields_req = err.response.data.split(',')
          console.log('Dashbaord: errData', typeof fields_req)
          console.log('Dashbaord: errData', fields_req)
          // setMissingRequirements(fields_req)
          toast.error(err.response.data)
        } else {
          if (err.response) {
            console.log('Dashbaord: statusText', err.response.statusText)
            toast.error(
              `${err.response.statusText} Stripe check failed. Please Refresh your browser and relogin.`,
            )
          } else {
            console.log(err)
          }
        }
        // setLoading(false)
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleClick = async () => {
    setLoading(true)
    try {
      // get stripe onboarding link
      console.log('Dashbaord: gettin stripe onboarding link for ', store.user)
      let res = await apiStripe.stripeConnectAccount(store.user)
      console.log('Dashbaord: res from stripeConnectAccount', res.data)
      window.location.href = res.data
    } catch (err) {
      if (err.response.data && err.response.data.length < 100) {
        console.log('Dashbaord: errData', err.response.data)
        toast.error(err.response.data)
      } else {
        console.log('Dashbaord: statusText', err.response.statusText)
        toast.error(
          `${err.response.statusText} Token- Stripe connect failed. Please Refresh your browser and Try again.`,
        )
      }
      setLoading(false)
    }
  }

  const connected = () => (
    <div className="row">
      {console.log('connected')}
      <div className="col-md-10 p-2">
        <b>You are ready to create Products and receive payment</b>
      </div>
      <div className="col-md-2">
        <Link to="/products/new" className="btn btn-primary">
          + Add New Product
        </Link>
      </div>
      <div className="col-md-2"></div>
    </div>
  )

  const notConnected = () => (
    <div className="row">
      {console.log('not connected')}
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
              {missingRequirements.length > 0 ? (
                missingRequirements.map((value, index) => {
                  return <li key={index}>{value}</li>
                })
              ) : (
                <>
                  <li>Address</li>
                  <li>Contact Details</li>
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
        ) : store.user.stripe_registration_complete ? (
          connected()
        ) : (
          notConnected()
        )}
      </div>
    </>
  )
}

export default Dashbaord
