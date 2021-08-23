import './MyBookings.css'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import getUserBookings from '../../apiServices/bookingsApi'
import Experience from '../../components/experiences/experience'

export default function MyBookings() {
  const [myBookings, setMyBookings] = useState([])

  useEffect(() => {
    ;(async () => {
      try {
        const res = await getUserBookings()
        setMyBookings(res.data)
      } catch (e) {
        console.log(e)
      }
    })()
  }, [])

  return (
    <div>
      <div className="exp-list">
        {myBookings.map((xp, i) => (
          <Experience key={i} experience={xp} />
        ))}
      </div>
    </div>
  )
}

//create
