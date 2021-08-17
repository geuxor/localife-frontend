import axios from 'axios'
import { useState, useRef } from 'react'
import './registration.css'

export default function Registration() {
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
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="First Name" ref={firstNameRef} />
        <input type="text" placeholder="Last Name" ref={lastNameRef} />
        <input type="email" placeholder="email" ref={emailRef} />
        <input type="password" placeholder="password" ref={passwordRef} />
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
