import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './NavBar.css'
import { RootState } from '../../redux/reducers/reducers'
import LogIn from '../LogIn/LogIn'
import { SET_USER, SET_LOGIN } from '../../redux/actions/actions'

function NavBar() {
  const dispatch = useDispatch()

  const [showLogIn, setShowLogIn] = useState(false)

  function logInUser(details) {
    if (
      details.email == adminUser.email &&
      details.password == adminUser.password
    ) {
      dispatch({ type: SET_USER, payload: {} })
    } else {
      console.log('details do not match')
    }
  }

  function logOut() {
    dispatch({ type: SET_USER, payload: {} })
  }

  const [currentUser, setCurrentUser] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)

  const adminUser = {
    email: 'admin@admin.com',
    password: 'admin123',
  }

  const state = useSelector((state: RootState) => state)

  return (
    <header className="header">
      <a href="" className="logo">
        Localife
      </a>
      <input className="menu-btn" type="checkbox" id="menu-btn" />
      <label className="menu-icon" htmlFor="menu-btn">
        <span className="navicon"></span>
      </label>
      <ul className="menu">
        {/* {'about'} */}

        <li
          onClick={() => {
            console.log('about')
          }}
        >
          <a href="#work">About</a>
        </li>

        {/* {'REGISTER'} */}

        {currentUser ? (
          <li
            onClick={() => {
              console.log('log out')
            }}
          >
            <a href="log out">Log out</a>
          </li>
        ) : (
          <ul>
            {' '}
            <li
              onClick={() => {
                console.log('register')
              }}
            >
              <a href="#register">Register</a>
            </li>
            <li
              onClick={() => {
                setShowLogIn(true)
                setCurrentUser(true)
              }}
            >
              <a href="#login">Log in</a>
            </li>
          </ul>
        )}

        {/* <li
          onClick={() => {
            console.log('contact')
          }}
        >
          <a href="#contact">Contact</a>
        </li> */}
      </ul>
      {showLogIn && <LogIn logInUser={logInUser} setShowLogIn={setShowLogIn} />}
    </header>
  )
}
export default NavBar
