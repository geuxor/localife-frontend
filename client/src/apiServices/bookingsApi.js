import axios from 'axios'

const bookingsApi = {}

const options = {
  headers: { 'Content-Type': 'application/json' },
  method: 'post',
  withCredentials: true,
}

bookingsApi.createBooking = async (experience) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/bookings/new`,
    experience,
    options,
  )
}

bookingsApi.bookingSuccessRequest = async (experienceId) =>
  await axios.post(
    `${process.env.REACT_APP_API}/bookings/success`,
    experienceId,
    options,
  )

bookingsApi.getUserBookings = async () => {
  return await axios.post(
    `${process.env.REACT_APP_API}/bookings/mine`,
    null,
    options,
  )
}

bookingsApi.getOneBooking = async (id) => {
  console.log('...................', id)
  return await axios.post(
    `${process.env.REACT_APP_API}/booking/${id}`,
    null,
    options,
  )
}

export default bookingsApi
