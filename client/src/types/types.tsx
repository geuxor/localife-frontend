export interface ExperienceInterface {
  id: number
  title: string
  description: string
  image?: string
  location: string
  city: string
  country: string
  price: number
  from?: Date
  to?: Date
  quantity?: number
  lon: number
  lat: number
  createdAt: Date
  updatedAt: Date
  UserId: number
  User: User
}
interface User {
  avatar: string
  firstname: string
}
export interface Props {
  experience: any
}

export interface ExpState {
  experience: {
    User: {
      avatar: string
      first_name: string
    }
    UserId: number
    city: string
    country: string
    createdAt: string
    description: string
    from: string
    id: number
    image: string
    lat: number
    location: string
    lon: number
    price: number
    quantity: number
    subtitle: string
    title: string
    to: string
    updatedAt: string
  }[]
}

export interface Booking {
  id: number
  status: string
  providerId: string
  start_date: string
  end_date: string
  price: number
  quantity: number
  total: number
  createdAt: string
  Experience: ExperienceInterface
}

export interface BookingsApi {
  createBooking(experience: any): Promise<any>
  bookingSuccessRequest(bookingSuccessRequest: any): Promise<any>
  getUserBookings()
}
