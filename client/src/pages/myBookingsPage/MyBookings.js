import './MyBookings.css'
import { useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'
import BookingsApi from '../../apiServices/bookingsApi'
import Heart from '../../components/Spinner/Heart.Spinner'
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

  console.log('MYBOOKINGS', myBookings)
  const currentDate = new Date()
  const sortedExperiencesDistant = myBookings.sort(
    (a, b) => new Date(a.end_date) - new Date(b.end_date),
  )
  const pastExperiences = myBookings.filter(
    (exp) => new Date(exp.end_date) < currentDate,
  )
  const sortedExperiencesRecent = pastExperiences.sort(
    (a, b) => new Date(b.end_date) - new Date(a.end_date),
  )
  const futureExperiences = sortedExperiencesDistant.filter(
    (exp) => new Date(exp.start_date) > currentDate,
  )

  return (
    <>
      {loading ? (
        <Heart />
      ) : myBookings.length ? (
        <div>
          <h2 className="hello-user">
            Hello {store.user.firstname}
            <i class="far fa-smile"></i>
          </h2>
          <h5 className="upcoming">These are your upcoming experiences:</h5>
          <div className="booking-list">
            {futureExperiences.map((booking, i) => (
              <SingleBooking
                key={i}
                booking={booking}
                style={{
                  backgroundColor: i % 2 === 0 ? '#f6eede' : 'white',
                }}
              />
            ))}
          </div>
          <div className="past-exp-container">
            <h5 className="past-exp">Past experiences:</h5>
            {sortedExperiencesRecent.map((exp) => (
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
