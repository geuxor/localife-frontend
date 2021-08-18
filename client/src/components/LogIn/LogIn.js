import React, { useState, useEffect, useRef } from 'react'
import { toast } from "react-toastify";
import './LogIn.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
export default function LogIn({ setShowLogIn }) {
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
      console.log('Response from Server:', res)
      //save res to redux = { email: user.email, firstname: user.firstname, lastname: user.lastname, createdAt: user.createdAt}
      toast.success("Welcome! You are succesfully logged in!");
      setShowLogIn(false)
    } catch (err) {
      console.log(err)
      if (err.response && err.response.status >= 400)
        toast.error("Something went wrong!", err.response.data);

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
