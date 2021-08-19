export const SET_USER = 'SET_USER'
export const SET_LOGIN = 'SET_LOGIN'

//HELPER FUNCTIONS
export function setUser(user) {
  return {
    type: SET_USER,
    payload: user
  }
}

export function setLogIn() {
  return {
    type: {
      type: SET_LOGIN,
    },
  }
}
