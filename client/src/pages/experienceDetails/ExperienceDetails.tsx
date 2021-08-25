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
import LogIn from '../../components/LogIn/LogIn'
import Heart from '../../components/Spinner/Heart.Spinner.js'

function ExperienceDetails(props) {
  const [experience, setExperience] = useState<ExperienceInterface>()
  //
  const [loading, setLoading] = useState(true)
  const { id }: { id: string } = useParams()
  const authed = useSelector((state: RootState) => state.isLoggedIn)
  const [showLogIn, setShowLogIn] = useState(false)

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

  console.log(experience)
  return (
    <div className="details-container">
      {loading ? (
        <Heart />
      ) : experience ? (
        <div className="details-cont-rendered">
          <div className="details-title">
            <h1>{experience.title}</h1>
          </div>
          <div className="details-cont-images">{/* <ImgCarousel /> */}</div>
          <div className="details-cont-tpd-and-bookingForm">
            <div className="details-cont-title-prov-descrip">
              <div className="details-cont-provider">
                <h6>hosted by {experience.User.firstname}</h6>
                <img
                  className="user-avatar"
                  src={experience.User.avatar}
                  alt="user-avatar"
                />
              </div>
              <div className="details-cont-description">
                <p>{experience.description}</p>
              </div>
              <div className="food-icon">
                <i className="fas fa-utensils"></i>
                Food
              </div>
              <div className="transport-icon">
                <i className="fas fa-car-side"></i>
                Transport
              </div>
              <div className="tree-icon">
                <i className="fas fa-tree"></i>
                Outdoors
              </div>
              <div className="cat-icon">
                <i className="fas fa-cat"></i>
                Pet Friendly
              </div>
              <div className="kiss-icon">
                <i className="far fa-kiss-wink-heart"></i>
                LGBTQ+
              </div>
              <div className="baby-icon">
                <i className="fas fa-baby"></i>
                Kids
              </div>
              <div className="parking-icon">
                <i className="fas fa-parking"></i>
                Parking
              </div>
              <div className="disabled-icon">
                <i className="fas fa-wheelchair"></i>
                Wheelchair
              </div>
              <div></div>
            </div>
            <div className="details-datepicker-container">
              <div className="booking-cont-date">
                <DatePicker />
              </div>
              <div className="booking-cont-guests">
                <Guests />
              </div>
              <div className="booking-cont-booknow">
                <button
                  onClick={handleClick}
                  className="btn-book-now"
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
