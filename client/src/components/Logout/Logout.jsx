import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import apiAuth from '../../apiServices/auth'
import { delete_cookie } from '../../utils/cookieHandler'
import { toast } from 'react-toastify'
import { useEffect } from 'react'

export default function LogOut() {
  const history = useHistory()
  const dispatch = useDispatch()
  console.log('ready to logout')
  const logoutUser = async () => {
    try {
      delete_cookie()
      dispatch({
        type: 'SET_LOGOUT',
      })
      toast.info('You have been logged out...')
      const res = await apiAuth.logout()
      console.log('Logout: response', res)
      history.push('/')
      //why nothing happens after await apiAuth call???
    } catch (err) {
      console.log('Logout: Error fetching users:', err.response.data)
      history.push('/')
      if (err.response && err.response.status >= 400)
        toast.error(err.response.data)
    }
  }

  useEffect(() => {
    logoutUser()
  })
  return <div>Logged out</div>
}
