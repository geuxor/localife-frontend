import './MyBookings.css'
import { useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'
import BookingsApi from '../../apiServices/bookingsApi'
import Spinner from '../../components/Spinner/Spinner'
import SingleBooking from '../../components/SingleBooking/SingleBooking'
import moment from 'moment'

export default function MyBookings() {
  const [myBookings, setMyBookings] = useState([])
  const [loading, setLoading] = useState(true)

  const store = useSelector((state) => state)

  useEffect(() => {
    ;(async () => {
      try {
        const res = await BookingsApi.getUserBookings()
        setMyBookings(res.data)
        setLoading(false)
        console.log(res.data)
      } catch (e) {
        console.log(e)
        setLoading(false)
      }
    })()
  }, [])

  const formatDay = 'DD/MM/YYYY'
  const currentDate = new Date()
  const sortedExperiences = myBookings.sort(
    (a, b) => new Date(a.end_date) - new Date(b.end_date),
  )
  const pastExperiences = sortedExperiences.filter(
    (exp) => new Date(exp.end_date) > currentDate,
  )
  console.log('PAST', pastExperiences)
  // console.log(myBookings)

  return (
    <>
      {loading ? (
        <Spinner />
      ) : myBookings.length ? (
        <div>
          <h2 className="hello-user">
            Hello {store.user.firstname}
            <i class="far fa-smile"></i>
          </h2>
          <h5 className="upcoming">These are your upcoming events:</h5>
          <div className="booking-list">
            {myBookings.map((booking, i) => (
              <SingleBooking key={i} booking={booking} />
            ))}
          </div>
          <div className="past-exp-container">
            <h5 className="past-exp">Past experiences:</h5>
            {pastExperiences.map((exp) => (
              <div className="past-exp-detail">
                <h5>{exp.Experience.title}</h5>
                <h6>{moment(exp.end_date).fromNow()}</h6>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="container-no-bookings">
          No events booked yet, click{' '}
          <a className="anchor-redirect-home" href="/">
            here
          </a>{' '}
          to start a new adventure!
        </div>
      )}
    </>
  )
}
