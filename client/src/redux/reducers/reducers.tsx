//ACTIONS
import { SET_USER, SET_LOGIN, SET_LOGOUT, SET_STRIPE } from '../actions/actions'

const initialState = {
  isLoggedIn: false,
  user: {
    firstname: '',
    lastname: '',
    email: '',
  },
}

export const reducer = (state = initialState, action) => {
  console.log('action.payload', action.payload)
  switch (action.type) {
    case SET_USER:
      console.log(state)
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
    default:
      return state
  }
}

export type RootState = ReturnType<typeof reducer>
