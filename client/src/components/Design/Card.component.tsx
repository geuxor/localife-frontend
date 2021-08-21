import './Card.component.css'
import React, { useState } from 'react'
import moment from 'moment'

function Card({ experience }) {
  // console.log(experience)
  const [overlay, setOverlay] = useState('card-product')

  return (
    <>
      <div className="card">
        <img src={experience.image} className="xp-image" alt="a" />
        <div className="card-body">
          <h5 className="card-title">{experience.title}</h5>
          <p className="card-text">{experience.description} </p>
          <div className="d-flex flex-row justify-content-center align-items-baseline">
            <p className="small">by ...</p>
            <i className="far fa-clock px-1"></i>
            {moment(experience.createdAt).fromNow()}
          </div>
          <b>
            <span className="product_price p-4">
              Eur. {experience.price}.00
            </span>
          </b>
          <button className="btn-small btn-primary rounded no-shadow px-2">
            Buy Now
          </button>
        </div>
      </div>
    </>
  )
}

export default Card
