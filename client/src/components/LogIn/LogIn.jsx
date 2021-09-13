import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import './LogIn.css'
import apiAuth from '../../apiServices/auth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { setUser, setLogIn } from '../../redux/actions/actions'
import { get_cookie } from '../../utils/cookieHandler'

export default function LogIn({ setShowLogIn }) {
  const state = useSelector((state) => state)

  const dispatch = useDispatch()
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
      if (res.data && res.data.email === user.email) {
        const { email, firstname, lastname, createdAt, avatar } = res.data

        const userRedux = {
          email: email,
          firstname: firstname,
          lastname: lastname,
          avatar: avatar,
          createdAt: createdAt,
        }
        const mycookie = get_cookie()
        if (mycookie) {
          dispatch(setUser(userRedux))
          dispatch(setLogIn(true))
          setShowLogIn(false)
          toast.success('Welcome! You are successfully logged in!')
        } else {
          toast.error('Err: Who ate the cookie?')
        }
      }
    } catch (err) {
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
