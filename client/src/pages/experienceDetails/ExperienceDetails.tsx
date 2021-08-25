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
import Spinner from '../../components/Spinner/Spinner'
import LogIn from '../../components/LogIn/LogIn'
import moment from 'moment'
// import HeartSpinner from '../../components/Spinner/Heart.Spinner.js'
import bookingsApi from '../../apiServices/bookingsApi'

function ExperienceDetails(props) {
  const [experience, setExperience] = useState<ExperienceInterface>()
  const [startDate, setStartDate] = useState(null)
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
      console.log('ViewExperience Date:', startDate)
      //reformat
      //      Wed Aug 04 2021 00:00:00 GMT+0200 (Central European Summer Time)
      // to this
      //      2013-02-08 09:30
      const formatedStartDate = moment(startDate)
      console.log('formatedStartDate', formatedStartDate.toDate())
      const bookingData = {
        experience: experience,
        start_date: formatedStartDate,
      }

      console.log(bookingData)

      const res = await bookingsApi.createBooking(bookingData)
      // apiStripe.getSessionId(experience)
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
        <div>
          <div className="title-img-details-container">
            <ImgCarousel />
          </div>
          <h1 className="details-title">{experience.title}</h1>
          <div className="details-container2">
            <div className="provider-details-container">
              <div>
                <h6>hosted by </h6>
                <p>{experience.User.firstname}</p>
                <img src={experience.User.avatar} alt="user-avatar" />
                <div className="details-decription">
                  {experience.description}
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
