import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import BookingsApi from '../../apiServices/bookingsApi'
import Heart from '../../components/Spinner/Heart.Spinner'
import { toast } from 'react-toastify'
import './BookingDetails.css'
import moment from 'moment'

export default function BookingDetails() {
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [booking, setBooking] = useState()
  const store = useSelector((state) => state)
  useEffect(() => {
    ;(async () => {
      try {
        console.log('------------------')
        console.log(id)
        const detailedBooking = await BookingsApi.getOneBooking(id)
        console.log('detailedBooking', detailedBooking)
        setBooking(detailedBooking.data)
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
  }, [])

  console.log(booking)

  return (
    <div className="details-container">
      {loading ? (
        <Heart />
      ) : (
        <div>
          <h2 className="hello-booker">
            Hello {store.user.firstname}
            <i className="far fa-smile"></i>
          </h2>
          <div className="booking-confirmation">
            <h3>These are the details for your booking:</h3>
            <h5>{booking.Experience.title}</h5>
            <div className="location">
              <h6 className="location-details">
                {booking.Experience.city}, {booking.Experience.country}
                <i className="fas fa-map-marker-alt"></i>
              </h6>
              <h6 className="location-details">
                booked {moment(booking.createdAt).fromNow()}
                <i className="far fa-clock"></i>
              </h6>
            </div>
          </div>
          <img
            className="exp-picture-booking"
            src="https://i.ibb.co/2YFDb13/paella.jpg"
          ></img>
          <p className="booking-description-details">
            {booking.Experience.description}
          </p>
          <div className="provider-details">
            <p>
              You have booked an experience with our local{' '}
              <span className="provider-name">
                {booking.Experience.User.firstname}
              </span>
            </p>
            <img
              className="avatar-picture-booking"
              src={booking.Experience.User.avatar}
            ></img>
          </div>
        </div>
      )}
    </div>
  )
}
