import React, { useSelector } from 'react'
import './SingleBooking.css'
import moment from 'moment'

export default function SingleBooking({ booking }) {
  const formatDay = 'DD/MM/YYYY'
  const formatTime = 'HH:mm'

  return (
    <div className="booking-container2">
      <img
        src={booking.Experience.image}
        alt="experience"
        className="experience-image"
      />
      <div className="booking-container3">
        <div className="booking-container4">
          <div className="booking-title">{booking.Experience.title}</div>
          <div className="booking-description">
            {booking.Experience.description}
          </div>
        </div>
        <div className="booking-details-container">
          <div className="booking-price">
            <i className="fas fa-euro-sign"></i>
            {booking.price}.00
          </div>
          <div className="start-date">
            <p className="booking-date">
              {moment(booking.start_date).format(formatDay)}
              <i class="far fa-calendar-alt date-icon-start"></i>
            </p>
            <p className="booking-time">
              {moment(booking.start_date).format(formatTime)}
              <i class="far fa-clock clock-icon-start"></i>
            </p>
          </div>
          <div className="end-date">
            <p className="booking-date">
              {moment(booking.end).format(formatDay)}
              <i class="far fa-calendar-alt date-icon-end"></i>
            </p>
            <p className="booking-time">
              {moment(booking.end).format(formatTime)}
              <i class="far fa-clock clock-icon-end"></i>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
