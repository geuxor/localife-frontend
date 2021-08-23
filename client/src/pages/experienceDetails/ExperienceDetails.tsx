import './ExperienceDetails.css'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { filterExpById } from '../../helpers/helperFunctions'
import { ExperienceInterface } from '../../types/types'
import DatePicker from '../../components/datePicker/DatePicker'
import Guests from '../../components/guests/guests'
import Counter from '../../components/counter/counter'
import { useSelector } from 'react-redux'
import ExperiencesApi from '../../apiServices/experiencesApi'
import apiStripe from '../../apiServices/stripeApi'
import { loadStripe } from '@stripe/stripe-js'
import { RootState } from '../../redux/reducers/reducers'
import { toast } from 'react-toastify'
import Spinner from '../../components/Spinner/Spinner'
import LogIn from '../../components/LogIn/LogIn'

function ExperienceDetails(props) {
  const [experience, setExperience] = useState<ExperienceInterface>()
  const [loading, setLoading] = useState(true)
  const { id }: { id: string } = useParams()
  const numId = parseInt(id)
  const authed = useSelector((state: RootState) => state.isLoggedIn)
  const [showLogIn, setShowLogIn] = useState(false)
  console.log(authed)

  useEffect(() => {
    ;(async () => {
      console.log(id)
      try {
        const detailedExperience = await ExperiencesApi.viewExperience(id)
        console.log('detailedExperience', detailedExperience.data)
        setExperience(detailedExperience.data)
        setLoading(false)
      } catch (err) {
        if (err.response && err.response.status >= 400) {
          console.log(err.response.data)
          toast.error(err.response.data.message)
        } else {
          console.log(err)
        }
        setLoading(false)
      }
      // setExperience((prevstate) => {
      //   console.log('prevstate', prevstate)
      //   return prevstate
      // })
    })()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (experience) {
      document.body.style.overflow = 'auto'
    }
  })

  const handleClick = async (e) => {
    if (!authed) {
      toast.info('Please login before booking')
      setShowLogIn(true)
    } else {
      handleBook(e)
    }
  }
  const handleBook = async (e) => {
    let sessionId: string
    e.preventDefault()
    try {
      console.log('ViewExperience: Booking:', experience)
      const res = await apiStripe.getSessionId(experience)
      console.log('ViewExperience: Stripe SessionID res:', res)
      if (!res.data) throw new Error(res)
      sessionId = res.data.sessionId
      console.log('ViewExperience: ready handle booking:', sessionId)
      const stripe: any = await loadStripe(
        process.env.REACT_APP_STRIPE_PUBLISH_KEY!,
      )
      const checkout = stripe.redirectToCheckout({ sessionId: sessionId })
      toast.success('ViewExperience: its all good man!', checkout)

      setLoading(false)
    } catch (err) {
      setLoading(false)
      if (err.response && err.response.status >= 400) {
        console.log('err.response.data', err.response.data)
        toast.error(err.response.data)
      } else {
        console.log(err)
        toast.error(err)
      }
    }
  }

  return (
    <div className="details-container">
      {loading ? (
        <Spinner />
      ) : experience ? (
        <>
          <div className="title-img-details-container">
            <img
              src={experience?.image}
              alt="experience"
              className="details-img"
            />
          </div>
          <h1 className="details-title">{experience?.title}</h1>
          <div className="details-container2">
            <div className="provider-details-container">
              <div>
                <h6>hosted by </h6>
                <div className="details-decription">
                  {experience.description}
                </div>
                <button
                  onClick={handleClick}
                  className="btn btn-block btn-lg btn-primary"
                  disabled={loading}
                >
                  {loading ? 'loading...' : 'Book now'}
                </button>
              </div>
            </div>
            <div className="description-details-container">
              {/* <DatePicker /> */}
            </div>
          </div>
          <div>
            <Guests />
          </div>
        </>
      ) : (
        <div>{toast.error('Unable to fetch the experience')}</div>
      )}
      {showLogIn && <LogIn setShowLogIn={setShowLogIn} />}
    </div>
  )
}
export default ExperienceDetails
