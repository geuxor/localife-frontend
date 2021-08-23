import axios from 'axios'

const BookingsApi = {}

const options: any = {
  headers: { 'Content-Type': 'application/json' },
  method: 'post',
}

BookingsApi.getUserBookings = async () => {
  return await axios.post(
    `${process.env.REACT_APP_API}/bookings/mine`,
    null,
    options,
  )
}

export default BookingsApi
