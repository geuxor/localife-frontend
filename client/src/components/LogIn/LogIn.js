
import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useRef } from 'react'
import { toast } from "react-toastify";
import './LogIn.css'
import apiAuth from '../../apiServices/auth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { setUser } from '../../redux/actions/actions'
import { RootState } from '../../redux/reducers/reducers'

export default function LogIn({ setShowLogIn }) {
  const state = useSelector((state: RootState) => state)

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
      console.log('Response from Server:', res)
      const { email, firstname, lastname } = res.data
      // const user = {
      console.log(firstname)
      console.log(email)
      console.log(lastname)

      const userRedux = {
        firstname: firstname,
        email: email,
        lastname: lastname,
      }
      toast.success('Welcome! You are succesfully logged in!')
      setShowLogIn(false)
      dispatch(setUser(userRedux))
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
          onClick={() => setShowLogIn(false)}
        />
        <input type="email" placeholder="Email" ref={emailRef} />
        <input type="password" placeholder="Password" ref={passwordRef} />
        <button className="register-button">Login</button>
      </form>
    </div>
  )
}
