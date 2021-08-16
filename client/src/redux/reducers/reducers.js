//ACTIONS
import { SET_USER, SET_LOGIN } from '../actions/actions'

const initialState = {
  isLoggedin: false,
  user: {
    firstName: '',
    secondName: '',
    email: '',
  },
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: {},
      }
    case SET_LOGIN:
      return {
        ...state,
        isLoggedin: !state.isLoggedin,
      }
    default:
      return state
  }
}
