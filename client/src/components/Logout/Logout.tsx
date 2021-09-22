import { useAppDispatch } from '../../redux/hooks'
import { useHistory } from 'react-router-dom'
import apiAuth from '../../apiServices/auth'
import { delete_cookie } from '../../utils/cookieHandler'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import './Logout.css'

export default function LogOut() {
  const history = useHistory()
  const dispatch = useAppDispatch()
  const logoutUser = async () => {
    try {
      delete_cookie()
      dispatch({
        type: 'SET_LOGOUT',
      })
      toast.info('You have been logged out...')
      history.push('/')
    } catch (err: any) {
      history.push('/')
      if (err.response && err.response.status >= 400)
        toast.error(err.response.data)
    }
  }

  useEffect(() => {
    logoutUser()
  })
  return <div className="logged-out">Logged out</div>
}
