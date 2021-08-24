import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import apiStripe from '../../apiServices/stripeApi'
import { toast } from 'react-toastify'
import SpinIcon from '../../components/Design/Spin.component'
import { RootState } from '../../redux/reducers/reducers'

function BecomeProvider(props) {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const store = useSelector((state: RootState) => state)

  useEffect(() => {
    ;(async () => {
      try {
        setLoading(true)
        console.log('BecomeProvider: checking stripe conx for', store.user)
        let res = await apiStripe.stripeCheckAccount(store.user)
        console.log('BecomeProvider: res from stripeCheckAccount', res.data)
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: { stripe: { ...res.data } },
        })
        setLoading(false)
      } catch (err) {
        if (err.response && err.response.data.length < 100) {
          console.log('BecomeProvider: errData', err.response.data)
          toast.error(err.response.data)
        } else {
          console.log('BecomeProvider: statusText', err.response.statusText)
          toast.error(
            `${err.response.statusText} Stripe check failed. Please Refresh your browser and relogin.`,
          )
        }
        setLoading(false)
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleClick = async () => {
    setLoading(true)
    try {
      // get stripe onboarding link
      console.log(
        'BecomeProvider: gettin stripe onboarding link for ',
        store.user,
      )
      let res = await apiStripe.stripeConnectAccount(store.user)
      console.log('BecomeProvider: res from stripeConnectAccount', res.data)
      window.location.href = res.data
    } catch (err) {
      if (err.response.data && err.response.data.length < 100) {
        console.log('BecomeProvider: errData', err.response.data)
        toast.error(err.response.data)
      } else {
        console.log('BecomeProvider: statusText', err.response.statusText)
        toast.error(
          `${err.response.statusText} Token- Stripe connect failed. Please Refresh your browser and Try again.`,
        )
      }
      setLoading(false)
    }
  }

  const connected = () => (
    <div className="row">
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
      <div className="col-md-10 offset-md-1 text-left">
        <div className="p-1 pointer">
          <i className="fas fa-plug size-5"></i>
          <h4>Setup Payouts to create new Products</h4>
          <p className="lead">
            <b>Colonyal</b> partners with Stripe to transfer your earnings to
            your bank account You'll be redirected to Stripe's official platform
            to complete the process.
            <br />
            Once this has been completed you would be able to add new products
            and start selling!
          </p>
          <h5>
            Before you start the Government requires the following information:
          </h5>
          <div className="text-muted">
            <ul>
              <li>Name</li>
              <li>Address</li>
              <li>Contact Details</li>
              <li>Proof of ID and Address</li>
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

  return (
    <>
      <div className="container">
        {loading ? (
          <SpinIcon
            message={'just a few seconds to check your stripe account...'}
          />
        ) : store ? (
          connected()
        ) : (
          notConnected()
        )}
      </div>
    </>
  )
}

export default BecomeProvider
