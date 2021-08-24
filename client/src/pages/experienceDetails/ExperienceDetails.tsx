import './ExperienceDetails.css'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ExperienceInterface } from '../../types/types'
import DatePicker from '../../components/datePicker/DatePicker'
import Guests from '../../components/guests/guests'
import ImgCarousel from '../../components/carousel/carousel'
import { useSelector } from 'react-redux'
import ExperiencesApi from '../../apiServices/experiencesApi'
import apiStripe from '../../apiServices/stripeApi'
import { loadStripe } from '@stripe/stripe-js'
import { RootState } from '../../redux/reducers/reducers'
import { toast } from 'react-toastify'
// import Spinner from '../../components/Spinner/Spinner'
import LogIn from '../../components/LogIn/LogIn'
import Heart from '../../components/Spinner/Heart.Spinner.js'

function ExperienceDetails(props) {
  const [experience, setExperience] = useState<ExperienceInterface>()
  //
  const [loading, setLoading] = useState(true)
  const { id }: { id: string } = useParams()
  const authed = useSelector((state: RootState) => state.isLoggedIn)
  const [showLogIn, setShowLogIn] = useState(false)

  console.log('EXPERIENCES', experience)

  useEffect(() => {
    ;(async () => {
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
    })()
    // eslint-disable-next-line
  }, [])

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
        <Heart />
      ) : experience ? (
        <div className="details-cont-rendered">
          <div className="details-cont-images">
            {/* <ImgCarousel /> */}Images go here
          </div>
          <div className="details-cont-tpd-and-bookingForm">
            <div className="details-cont-title-prov-descrip">
              <div className="details-title">
                <h1>{experience.title}</h1>
              </div>
              <div className="details-cont-provider">
                <h6>hosted by </h6>
                <p>{experience.User.firstname}</p>
                <img src={experience.User.avatar} alt="user-avatar" />
              </div>
              <div className="details-cont-description">
                <p>{experience.description}</p>
              </div>
            </div>
            <div className="details-datepicker-container">
              <div className="booking-cont-date">
                <h6>Booking Form:</h6>
                <DatePicker />
              </div>
              <div className="booking-cont-guests">
                <Guests />
              </div>
              <div className="booking-cont-booknow">
                <button
                  onClick={handleClick}
                  className="btn btn-block btn-lg btn-primary"
                  style={{
                    backgroundColor: 'darkorange',
                    borderColor: 'darkgray',
                  }}
                  disabled={loading}
                >
                  {loading ? 'loading...' : 'Book now'}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>{toast.error('Unable to fetch the experience')}</div>
      )}
      {showLogIn && <LogIn setShowLogIn={setShowLogIn} />}
    </div>
  )
}
export default ExperienceDetails
