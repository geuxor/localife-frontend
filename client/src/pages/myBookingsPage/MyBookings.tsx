import './MyBookings.css'
import { useAppSelector } from '../../redux/hooks'
import React, { useEffect, useState } from 'react'
import bookingsApi from '../../apiServices/bookingsApi'
import Heart from '../../components/Spinner/Heart.Spinner'
import { SingleBooking } from '../../components/SingleBooking/SingleBooking'
import moment from 'moment'
import { Booking } from '../../types/types'

export default function MyBookings() {
  const [myBookings, setMyBookings] = useState([])
  const [loading, setLoading] = useState(true)

  const store = useAppSelector((state) => state)

  useEffect(() => {
    ;(async () => {
      try {
        const res = await bookingsApi.getUserBookings()
        setMyBookings(res.data)
        setLoading(false)
      } catch (e) {
        setLoading(false)
      }
    })()
  }, [])


  const currentDate = new Date()
  const sortedExperiencesDistant = myBookings.sort(
    (a: Booking, b: Booking) => new Date(a.end_date).getTime() - new Date(b.end_date).getTime(),
  )
  const pastExperiences = myBookings.filter(
    (exp: Booking) => new Date(exp.end_date) < currentDate,
  )
  const sortedExperiencesRecent = pastExperiences.sort(
    (a: Booking, b: Booking) => new Date(b.end_date).getTime() - new Date(a.end_date).getTime(),
  )
  const futureExperiences = sortedExperiencesDistant.filter(
    (exp: Booking) => new Date(exp.start_date) > currentDate,
  )

  return (
    <>
      {loading ? (
        <Heart />
      ) : myBookings.length ? (
        <div>
          <h2 className="hello-user">
            Hello {store.user.firstname}
            <i className="far fa-smile"></i>
          </h2>
          <h5 className="upcoming">These are your upcoming experiences:</h5>
          <div className="booking-list">
            {futureExperiences.map((booking, i) => (
              <SingleBooking key={i} booking={booking} />
            ))}
          </div>
          <div className="past-exp-container">
            <h5 className="past-exp">Past experiences:</h5>
            {sortedExperiencesRecent.map((exp: any) => (
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
