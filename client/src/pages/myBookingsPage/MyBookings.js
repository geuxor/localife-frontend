import './MyBookings.css'
import { useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import BookingsApi from '../../apiServices/bookingsApi'
import Experience from '../../components/experiences/experience'
import SingleBooking from '../../components/SingleBooking/SingleBooking'

export default function MyBookings() {
  const [myBookings, setMyBookings] = useState([])

  const store = useSelector((state) => state)

  useEffect(() => {
    ;(async () => {
      try {
        const res = await BookingsApi.getUserBookings()
        setMyBookings(res.data)
        console.log(res.data)
      } catch (e) {
        console.log(e)
      }
    })()
  }, [])

  console.log(myBookings)

  return (
    <div>
      <h2 className="hello-user">
        Hello {store.user.firstname}
        <i class="far fa-smile"></i>
      </h2>
      <h5 className='upcoming'>Upcoming Events:</h5>
      <div className="booking-list">
        {myBookings.map((booking, i) => (
          <SingleBooking key={i} booking={booking} />
        ))}
      </div>
    </div>
  )
}
