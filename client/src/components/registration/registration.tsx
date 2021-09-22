import { toast } from 'react-toastify'
import { useRef, useLayoutEffect } from 'react'
import apiAuth from '../../apiServices/auth'
import './registration.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

export default function Registration({ setShowRegister, setShowLogIn }) {
  const firstNameRef = useRef<HTMLInputElement>(null)
  const lastNameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  useLayoutEffect(() => {}, [])

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const newUser = {
      firstname: firstNameRef.current!.value,
      lastname: lastNameRef.current!.value,
      email: emailRef.current!.value,
      password: passwordRef.current!.value,
    }
    try {
      const res = await apiAuth.registerUser(newUser)
      if (res.data === 'ok') {
        setShowRegister(false)
        setShowLogIn(true)
        toast.success('You have been successfully registered!')
      } else {
        toast.error(res.data)
      }
    } catch (err: any) {
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
