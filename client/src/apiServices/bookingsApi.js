import axios from 'axios'

const BookingsApi = {}

const options = {
  headers: { 'Content-Type': 'application/json' },
  method: 'post',
  withCredentials: true,              
}

BookingsApi.getUserBookings = async () => {
  return await axios.post(
    `${process.env.REACT_APP_API}/bookings/mine`,
    null,
    options,
  )
}

export default BookingsApi
