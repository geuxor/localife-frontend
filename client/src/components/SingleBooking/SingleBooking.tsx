import React from 'react'
import './SingleBooking.css'
import moment from 'moment'
import { useHistory } from 'react-router'

interface Props {
  booking: any
}

export const SingleBooking: React.FC<Props> = ({ booking }: Props) => {
  const formatDay: string = 'DD/MM/YYYY'
  const formatTime: string = 'HH:mm'

  const history = useHistory()

  const handleClick = () => history.push(`/booking/${booking.id}`)

  return (
    <div className="booking-container2">
      <img
        src={booking.Experience.image}
        alt="experience"
        className="booking-image"
      />
      <div className="booking-container3">
        <div className="booking-container4">
          <div className="booking-title">{booking.Experience.title}</div>
          <div className="booking-description">
            {booking.Experience.subtitle}
          </div>
        </div>
        <div className="booking-details-container">
          <div className="booking-price">
            <i className="fas fa-euro-sign"></i>
            {Math.round(booking.total / 100)}.00
          </div>
          <div className="start-date">
            <p className="booking-date">
              {moment(booking.start_date).format(formatDay)}
              <i className="far fa-calendar-alt date-icon-start"></i>
            </p>
            <p className="booking-time">
              {moment(booking.start_date).format(formatTime)}
              <i className="far fa-clock clock-icon-start"></i>
            </p>
          </div>
          <div className="end-date">
            <p className="booking-date">
              {moment(booking.end_date).format(formatDay)}
              <i className="far fa-calendar-alt date-icon-end"></i>
            </p>
            <p className="booking-time">
              {moment(booking.end_date).format(formatTime)}
              <i className="far fa-clock clock-icon-end"></i>
            </p>
          </div>
          <button
            className="exp-info-button"
            type="button"
            onClick={handleClick}
          >
            More Info
          </button>
        </div>
      </div>
    </div>
  )
}
