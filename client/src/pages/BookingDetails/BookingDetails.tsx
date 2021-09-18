import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../redux/hooks'
import { useParams } from 'react-router-dom'
import BookingsApi from '../../apiServices/bookingsApi'
import Heart from '../../components/Spinner/Heart.Spinner'
import { toast } from 'react-toastify'
import {Booking} from '../../types/types'
import './BookingDetails.css'
import moment from 'moment'

type QuizParams = {
  id: string;
};

export default function BookingDetails() {
  const { id } = useParams<QuizParams>()
  const [loading, setLoading] = useState<boolean>(true)
  const [booking, setBooking] = useState<Booking>([] as any)
  const store = useAppSelector((state) => state)
  useEffect(() => {
    ;(async () => {
      try {
        const detailedBooking = await BookingsApi.getOneBooking(id)
        setBooking(detailedBooking.data)
        setLoading(false)
      } catch (err) {
        if (err.response && err.response.status >= 400) {
          toast.error(err.response.data.message)
        } else {
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
            alt="booking-experience"
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
