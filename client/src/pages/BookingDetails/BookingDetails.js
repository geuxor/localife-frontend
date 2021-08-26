import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import BookingsApi from '../../apiServices/bookingsApi'
import Heart from '../../components/Spinner/Heart.Spinner'
import { toast } from 'react-toastify'
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
  return (
    <div className="details-container">
      {loading ? (
        <Heart />
      ) : (
        <div>
          <h2 className="hello-user">
            Hello {store.user.firstname}
            <i className="far fa-smile"></i>
          </h2>
          <h5 className="booking-confirmation">
            These are the details for your booking
          </h5>
          <h5>{booking.Experience.title}</h5>
          <p>
            When visiting Barcelona, one of the highlights is the food. Not only
            Catalonia is a beautiful region but also boasts some of the best
            gourmet delicacies in Spain. Typical food in Barcelona is quite
            different from what you might have in mind if you have tried
            traditional dishes in other parts of the country. Paella is a
            traditional Spanish dish. It is a rice dish that can have meat,
            fish, seafood, and vegetables and is characterized by its use of
            saffron to give it a yellow color and unique flavor.
          </p>
        </div>
      )}
    </div>
  )
}
