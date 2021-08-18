import React, { useState, useEffect, useRef } from 'react'
import './LogIn.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
export default function LogIn({ setShowLogIn }) {
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const emailRef = useRef()
  const passwordRef = useRef()
  async function handleSubmit(e) {
    e.preventDefault()
    const user = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }
    try {
      const res = await axios.post('http://localhost:4001/login', user)
      setError(false)
      setSuccess(true)
    } catch (e) {
      console.log(e)
      setError(true)
      setSuccess(false)
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
        {success && (
          <span className="success">
            User successfully created, you may log in!
          </span>
        )}
        {error && <span className="failure">Something went wrong!</span>}
      </form>
    </div>
  )
}
