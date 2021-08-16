const SET_USER = 'SET_USER'
const SET_LOGIN = 'SET_LOGIN'

//HELPER FUNCTIONS
export function setUser() {
  return {
    type: SET_USER,
  }
}

export function setLogin() {
  return {
    type: {
      type: SET_LOGIN,
    },
  }
}
