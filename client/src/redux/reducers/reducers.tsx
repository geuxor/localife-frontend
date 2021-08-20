//ACTIONS
import { SET_USER, SET_LOGIN, SET_LOGOUT } from '../actions/actions'

const initialState = {
  isLoggedIn: false,
  user: {
    firstname: '',
    lastname: '',
    email: '',
  },
}

export const reducer = (state = initialState, action) => {
  console.log(action.payload)
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
        isLoggedIn: !state.isLoggedIn,
      }
    case SET_LOGOUT:
      return initialState
    default:
      return state
  }
}

export type RootState = ReturnType<typeof reducer>
