import axios from 'axios'
import { useState, useRef } from 'react'
import './registration.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

export default function Registration({ setShowRegister }) {
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const firstNameRef = useRef()
  const lastNameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newUser = {
      firstname: firstNameRef.current.value,
      lastname: lastNameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }
    try {
      await axios.post('http://localhost:4001/register', newUser)
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
          onClick={() => setShowRegister(false)}
        />
        <input type="text" placeholder="First Name" ref={firstNameRef} />
        <input type="text" placeholder="Last Name" ref={lastNameRef} />
        <input type="email" placeholder="Email" ref={emailRef} />
        <input type="password" placeholder="Password" ref={passwordRef} />
        <button className="register-button">Register</button>
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
