export interface ExperienceInterface {
  id: number
  title: string
  description: string
  image?: string
  location: string
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
