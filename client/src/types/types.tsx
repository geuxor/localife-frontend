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
  UserId?: number
}

export interface Props {
  experience: any
}

//TODO: update exp ineterface

// User: null
// UserId: null
// createdAt: "2021-08-17T10:00:30.582Z"
// description: "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016"
// from: null
// id: 1
// image: "http://placeimg.com/640/480"
// lat: null
// location: "Littleton"
// lon: null
// price: 619
// quantity: null
// title: "Gorgeous iure inventore pariatur"
// to: null
// updatedAt: "2021-08-17T10:00:30.582Z"
