import './ExperienceDetails.css'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { filterExpById } from '../../helpers/helperFunctions'
import { ExperienceInterface } from '../../types/types'
import DatePicker from '../../components/datePicker/DatePicker'
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
  const [sessionId, setSessionId] = useState('')
  const authed = useSelector((state: RootState) => state.isLoggedIn)
  const [showLogIn, setShowLogIn] = useState(false)
  const [dbres, setDbres] = useState('')
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

  const handleClick = async (e) => {
    if (!authed) {
      setShowLogIn(true)
    } else {
      handleBook(e)
    }

    //     setShowLogIn={setShowLogIn}
    //   />
    // )}
  }
  const handleBook = async (e) => {
    e.preventDefault()
    try {
      console.log('ViewExperience: Booking:', experience)
      const res = await apiStripe.getSessionId(experience)
      //how to show error??? following console log is not showing
      console.log('ViewExperience: Stripe SessionID res:', res)
      setDbres(res)
      if (!res.data) throw new Error(res)
      setSessionId(res.data.sessionId)
      console.log('ViewExperience: ready handle booking:', sessionId)
      const stripe: any = await loadStripe(
        process.env.REACT_APP_STRIPE_PUBLISH_KEY!,
      )
      //why is checkout not finding session Id??? should i do this in the backend ?  or create the session in useEffect
      setTimeout(() => {
        const checkout = stripe.redirectToCheckout({ sessionId: sessionId })
        toast.success('ViewExperience: its all good man!', checkout)
      }, 5000)
      setLoading(false)
      console.log(dbres)
    } catch (err) {
      setLoading(false)
      if (err.response && err.response.status >= 400) {
        console.log('err.response.data', err.response.data)
        toast.error(err.response.data)
      } else {
        console.log(err)
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
            <h1 className="details-title">{experience?.title}</h1>
            <img
              src={experience?.image}
              alt="experience"
              className="details-img"
            />
          </div>
          <div className="details-container2">
            <div className="provider-details-container">
              <div>
                <h4>{experience?.title}</h4>
                <h6>hosted by Maria</h6>
                <div>
                  "I have been merging all my life and I want to share my
                  passion with you"
                </div>
              </div>
              <div className="details-decription">
                {experience?.description}
              </div>
            </div>
            <div className="description-details-container">
              {/* <DatePicker /> */}
            </div>
            <button
              onClick={handleClick}
              className="btn btn-block btn-lg btn-primary"
              disabled={loading}
            >
              {authed ? 'Book now' : loading ? 'loading...' : 'Login'}
            </button>
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
