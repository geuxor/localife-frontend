import {
  SET_USER,
  SET_LOGIN,
  SET_LOGOUT,
  SET_STRIPE,
  SET_XP,
} from '../actions/actions'

const initialState = {
  isLoggedIn: false,
  user: {
    firstname: '',
    lastname: '',
    email: '',
    id: null,
    stripe_registration_complete: null,
    avatar: '',
    createdAt: null
  },

  experience: {
    
  },
  stripe: {
    lifetime_volume: Number,
    balance_pending_curr: 0,
    balance_pending_amount: Number
  },
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      }
    case SET_LOGIN:
      return {
        ...state,
        isLoggedIn: action.payload,
      }
    case SET_LOGOUT:
      return initialState
    case SET_STRIPE:
      return {
        ...state,
        stripe: action.payload,
      }
    case SET_XP:
      return {
        ...state,
        experience: action.payload,
      }
    default:
      return state
  }
}

export type RootState = ReturnType<typeof reducer>
