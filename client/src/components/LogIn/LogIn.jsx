import React, { useRef } from 'react'
import { useAppDispatch } from '../../redux/hooks'
import { toast } from 'react-toastify'
import './LogIn.css'
import apiAuth from '../../apiServices/auth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { setUser, setLogIn } from '../../redux/actions/actions'
import { get_cookie } from '../../utils/cookieHandler'

export default function LogIn({ setShowLogIn }) {
  const dispatch = useAppDispatch()
  const emailRef = useRef()
  const passwordRef = useRef()

  async function handleSubmit(e) {
    e.preventDefault()
    const user = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }
    try {
      const res = await apiAuth.loginUser(user)
      console.log('Response from Server:', res)
      if (res.data && res.data.email === user.email) {
        const { email, firstname, lastname, createdAt, avatar } = res.data

        const userRedux = {
          email: email,
          firstname: firstname,
          lastname: lastname,
          avatar: avatar,
          createdAt: createdAt,
        }
        dispatch(setUser(userRedux))
        dispatch(setLogIn(true))
        setShowLogIn(false)
        toast.success('Welcome! You are successfully logged in!')
        const mycookie = get_cookie()
        console.log('Login: new cookie found:', mycookie)
      }
    } catch (err) {
      console.log(err)
      if (err.response && err.response.status >= 400)
        toast.error('Something went wrong!', err, err.response.data)
    }
  }

  return (
    <div className="register-container">
      <form className="register" onSubmit={handleSubmit}>
        <FontAwesomeIcon
          className="icon"
          icon={faTimes}
          onClick={() => setShowLogIn(false)}
        />
        <input type="email" placeholder="Email" ref={emailRef} />
        <input type="password" placeholder="Password" ref={passwordRef} />
        <button className="register-button">Login</button>
      </form>
    </div>
  )
}
