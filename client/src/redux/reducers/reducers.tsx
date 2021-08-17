//ACTIONS
import { SET_USER, SET_LOGIN } from '../actions/actions'

const initialState = {
  isLoggedIn: false,
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
        isLoggedIn: !state.isLoggedIn,
      }
    default:
      return state
  }
}

export type RootState = ReturnType<typeof reducer>
