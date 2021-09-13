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
import moment from 'moment'
import bookingsApi from '../../apiServices/bookingsApi'
import Heart from '../../components/Spinner/Heart.Spinner.js'

function ExperienceDetails(props) {
  const [experience, setExperience] = useState<ExperienceInterface>()
  const [startDate, setStartDate] = useState(null)
  const [loading, setLoading] = useState(true)
  const { id }: { id: string } = useParams()
  const authed = useSelector((state: RootState) => state.isLoggedIn)
  const [showLogIn, setShowLogIn] = useState(false)

  useEffect(() => {
    ;(async () => {
      try {
        const detailedExperience = await ExperiencesApi.viewExperience(id)
        setExperience(detailedExperience.data)
        setLoading(false)
      } catch (err: any) {
        if (err.response && err.response.status >= 400) {
          toast.error(err.response.data.message)
        } else {
          console.log(err)
        }
        setLoading(false)
      }
    })()
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
      const formatedStartDate = moment(startDate)
      const bookingData = {
        experience: experience,
        start_date: formatedStartDate,
      }

      const res = await bookingsApi.createBooking(bookingData)
      console.log('ViewExperience: Create Booking SessionID res:', res)
      if (!res.data) throw new Error('Unable to create booking')
      sessionId = res.data.sessionId
      console.log('ViewExperience: ready handle booking:', sessionId)
      const stripe: any = await loadStripe(
        process.env.REACT_APP_STRIPE_PUBLISH_KEY!,
      )
      const checkout = stripe.redirectToCheckout({ sessionId: sessionId })
      toast.info('Ready to check out...!', checkout)
      setLoading(false)
    } catch (err: any) {
      setLoading(false)
      if (err.response && err.response.status >= 400) {
        toast.error(err.response.data)
      } else {
        toast.error(err)
      }
    }
  }
  return (
    <div className="details-container2">
      {loading ? (
        <Heart />
      ) : experience ? (
        <div className="details-cont-rendered2">
          <div className="exp-details-title2">
            <h1>{experience.title}</h1>
          </div>
          <div className="details-cont-images2">
            <img src={experience.image} alt="barcelona-view" className="img1" />
            <div className="smaller-image-cont">
              <img
                src={experience.image}
                alt="barcelona-beach"
                className="img2"
              />
              <img
                src="https://source.unsplash.com/MEW5M1WhMQE/400x400"
                alt="barcelona-paella"
                className="img2"
              />
              <img
                src="https://source.unsplash.com/akvIvA4ZEeg/400x400"
                alt="barcelona-beach"
                className="img2"
              />
              <img
                src="https://source.unsplash.com/sSyRnrhAqU8/400x400"
                alt="barcelona-beach"
                className="img2"
              />
            </div>
          </div>
          <div className="details-cont-tpd-and-bookingForm2">
            <div className="details-cont-title-prov-descrip2">
              <div className="details-cont-provider2">
                <img
                  className="user-avatar2"
                  src={experience.User.avatar}
                  alt="user-avatar"
                />
                <div className="details-cont-prov-headers2">
                  <h4>hosted by {experience.User.firstname}</h4>
                  <h6>a local since 1988</h6>
                </div>
              </div>
              <div className="details-cont-description2">
                <p className="desc2">{experience.description}</p>
              </div>

              <div className="icons-container">
                <div className="left-hand-icons">
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
                </div>

                <div className="right-hand-icons">
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
                </div>
              </div>
            </div>

            <div className="details-datepicker-container">
              <div className="booking-cont-date">
                <h6>Booking Form:</h6>
                <DatePicker startDate={startDate} setStartDate={setStartDate} />
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
