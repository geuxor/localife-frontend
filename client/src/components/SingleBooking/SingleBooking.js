import React, {useSelector} from 'react'
import './SingleBooking.css'

export default function SingleBooking({booking}) {


  console.log(booking.Experience)
  return (
    <div className="exp-container2">
      <img
        src={booking.Experience.image}
        alt="experience"
        className="experience-image"
      />
      <div className="exp-container3">
        <div className="exp-container4">
          <div className="experience-title">{booking.Experience.title}</div>
          <div className="experience-description">{booking.Experience.description}</div>
        </div>
        <div className="exp-container5">
          <b>
            <div className="exp-price">
              <i className="fas fa-euro-sign"></i>
              {booking.price}.00
            </div>
          </b>
        </div>
      </div>
    </div>
  )
}
