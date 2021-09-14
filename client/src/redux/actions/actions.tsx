export const SET_USER = 'SET_USER'
export const SET_LOGIN = 'SET_LOGIN'
export const SET_LOGOUT = 'SET_LOGOUT'
export const SET_STRIPE = 'SET_STRIPE'
export const SET_XP = 'SET_XP'

export function setUser(user) {
  return {
    type: SET_USER,
    payload: user,
  }
}

export function setLogIn(button) {
  return {
    type: SET_LOGIN,
    payload: button,
  }
}

export function setLogout() {
  return {
    type: SET_LOGOUT,
  }
}

export function setStripe(stripe) {
  return {
    type: SET_STRIPE,
    payload: stripe,
  }
}

export function setXp(experience) {
  return {
    type: SET_XP,
    payload: experience,
  }
}
