import axios from 'axios'
import { baseUrl } from '../helpers/helperFunctions'
const bookingsApi = {}

const options = {
  headers: { 'Content-Type': 'application/json' },
  method: 'post',
  withCredentials: true,
}

bookingsApi.createBooking = async (experience) => {
  return await axios.post(
    `${baseUrl}/bookings/new`,
    experience,
    options,
  )
}

bookingsApi.bookingSuccessRequest = async (experienceId) =>
  await axios.post(
    `${baseUrl}/bookings/success`,
    experienceId,
    options,
  )

bookingsApi.getUserBookings = async () => {
  return await axios.post(
    `${baseUrl}/bookings/mine`,
    null,
    options,
  )
}

bookingsApi.getOneBooking = async (id) => {
  return await axios.post(
    `${baseUrl}/booking/${id}`,
    null,
    options,
  )
}

export default bookingsApi
