import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import apiStripe from '../../apiServices/stripeApi'
import ExperiencesApi from '../../apiServices/experiencesApi'
import { toast } from 'react-toastify'
import { RootState } from '../../redux/reducers/reducers'
import Heart from '../Spinner/Heart.Spinner'
import DashboardBanner from './DashboardBanner.component'
import { setStripe } from '../../redux/actions/actions'
import './Dashboard.css'

function Dashbaord(props) {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [myExperiences, setmyExperiences] = useState()
  const store = useSelector((state: RootState) => state)

  const fetchMyExperiences = async () => {
    let res = await ExperiencesApi.getMyExperiences()
    return res
  }

  useEffect(() => {
    ;(async () => {
      try {
        console.log('Dashbaord: checking stripe conx for', store.user)
        let res = await apiStripe.stripeCheckAccount(store.user)
        console.log('Dashbaord: res from stripeCheckAccount', res.data)
        if (res.data === 'COMPLETE') {
          if (store.isLoggedIn && store.user.email !== '') {
            const xpList = fetchMyExperiences()
            setmyExperiences(await xpList)
            console.log('Dashboard: fetching balance info from backend')
            let res = await apiStripe.getAccountBalance(store)
            console.log(
              'DashboardBanner: Stripe accountBalance Api Response',
              res,
            )
            dispatch(setStripe(res.data))
          }
        }
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

  const connected = () => (
    <div>
      {console.log('connected')}
      <DashboardBanner />
    </div>
  )

  const color = '#e4a700'
  const size = '86px'

  return (
    <>
      <div className="container-fluid bg-light py-4 px-5">
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
    </>
  )
}

export default Dashbaord
