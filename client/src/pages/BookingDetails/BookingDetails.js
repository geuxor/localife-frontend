import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import { useParams } from 'react-router-dom'

export default function BookingDetails() {

  const { id }: { id: string } = useParams()
  const authed = useSelector((state: RootState) => state.isLoggedIn)
  const [loading, setLoading] = useState(true)
  const [booking, setBooking] = useEffect()

  useEffect(() => {
    ;(async () => {
      try {
        const detailedBooking = await ExperiencesApi.viewExperience(id)
        console.log('detailedExperience', detailedExperience.data)
        setExperience(detailedExperience.data)
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
    // eslint-disable-next-line
  }, [])


  return (
    <div>
      
    </div>
  )
}
