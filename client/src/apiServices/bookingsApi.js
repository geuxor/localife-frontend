import axios from 'axios'
import { setEndpoint } from '../helpers/helperFunctions'
const bookingsApi = {}

const options = {
  headers: { 'Content-Type': 'application/json' },
  method: 'post',
  withCredentials: true,
}

bookingsApi.createBooking = async (experience) => {
  return await axios.post(
    `${setEndpoint}/bookings/new`,
    experience,
    options,
  )
}

bookingsApi.bookingSuccessRequest = async (experienceId) =>
  await axios.post(
    `${setEndpoint}/bookings/success`,
    experienceId,
    options,
  )

bookingsApi.getUserBookings = async () => {
  return await axios.post(
    `${setEndpoint}/bookings/mine`,
    null,
    options,
  )
}

bookingsApi.getOneBooking = async (id) => {
  return await axios.post(
    `${setEndpoint}/booking/${id}`,
    null,
    options,
  )
}

export default bookingsApi
