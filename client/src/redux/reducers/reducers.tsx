//ACTIONS
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
  },

  experience: {},
  stripe: {},
}

export const reducer = (state = initialState, action) => {
  // console.log('action.payload', action.payload)
  switch (action.type) {
    case SET_USER:
      // console.log(state)
      return {
        ...state,
        user: action.payload,
        // user: { ...state.user, stripe_registration_complete: action.payload},
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
