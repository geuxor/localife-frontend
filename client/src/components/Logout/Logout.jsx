import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import apiAuth from '../../apiServices/auth'
import { delete_cookie } from '../../utils/cookieHandler'
import { toast } from 'react-toastify'
import { useEffect } from 'react'

export const useLogOut = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const logoutUser = async () => {
    try {
      delete_cookie()
      dispatch({
        type: 'SET_LOGOUT',
      })
      toast.info('You have been Logged out...')
      let res = await apiAuth.logout()
      console.log('Logout: response', res)
      history.push('/#login')
    } catch (err) {
      console.log('Logout: Error fetching users:', err.response.data)
      history.push('/#login')
      if (err.response && err.response.status >= 400)
        toast.error(err.response.data)
    }
  }
  return { logoutUser }
}

export default function LogOut() {
  console.log('ready to logout')
  const { logoutUser } = useLogOut()
  useEffect(() => {
    logoutUser()
  })
  return <div>Logout</div>
}
