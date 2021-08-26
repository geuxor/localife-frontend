import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import apiStripe from '../../apiServices/stripeApi'
import { toast } from 'react-toastify'
import { RootState } from '../../redux/reducers/reducers'
import Heart from '../Spinner/Heart.Spinner'
import DashboardBanner from './DashboardBanner.component'
import { setStripe } from '../../redux/actions/actions'
import './Dashboard.style.css'

function Dashbaord(props) {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const store = useSelector((state: RootState) => state)

  useEffect(() => {
    ;(async () => {
      try {
        console.log('Dashbaord: checking stripe conx for', store.user)
        let res = await apiStripe.stripeCheckAccount(store.user)
        console.log('Dashbaord: res from stripeCheckAccount', res.data)
        if (res.data === 'COMPLETE') {
          if (store.isLoggedIn && store.user.email !== '') {
            console.log('Dashboard: fetching balance info from backend')
            let res = await apiStripe.getAccountBalance(store)
            console.log(
              'DashboardBanner: Stripe accountBalance Api Response',
              res.data,
            )
            dispatch(setStripe(res.data))
          }
        }
        setLoading(false)
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

  const connected = () => (
    <div>
      {console.log('connected', store.stripe)}
      <DashboardBanner />
    </div>
  )

  const color = '#e4a700'
  const size = '86px'

  return (
    <>
      <div className="dashboard">
        <div className="dahsboard p-5 bg-light">
          <div className="justify-content-center">
            {loading ? (
              <div className="m-5 p-5">
                <Heart color={color} size={size} />
              </div>
            ) : (
              store.user.stripe_registration_complete && connected()
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashbaord
