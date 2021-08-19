import { toast } from 'react-toastify'
import { useRef } from 'react'
import apiAuth from '../../apiServices/auth'
import './registration.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

export default function Registration({ setShowRegister, setShowLogIn }) {
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
      const res = await apiAuth.registerUser(newUser)
      console.log('Response from backend:', res.data)
      if (res.data === 'ok') {
        setShowRegister(false)
        setShowLogIn(true)
        toast.success('You have been succesfully registered!')
      } else {
        toast.error(res.data)
      }
    } catch (err) {
      console.log(err)
      if (err.response && err.response.status >= 400)
        toast.error('Something went wrong!', err.response.data)
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
      </form>
    </div>
  )
}
