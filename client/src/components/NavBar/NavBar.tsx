import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import './NavBar.css'
import Registration from '../registration/registration'
import { RootState } from '../../redux/reducers/reducers'
import LogIn from '../LogIn/LogIn'
import { Link } from 'react-router-dom'

function NavBar() {
  const [currentUser, setCurrentUser] = useState(false)
  const [showLogIn, setShowLogIn] = useState(false)
  const [showRegister, setShowRegister] = useState(false)

  const state = useSelector((state: RootState) => state)

  console.log(state.isLoggedIn)

  return (
    <header className="header">
      <a href="/" className="logo">
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

        {currentUser ? (
          <li>
            <a href="/logout">Logout</a>
          </li>
        ) : (
          <ul>
            {' '}
            <li
              onClick={() => {
                setShowRegister(true)
                console.log('register')
              }}
            >
              <a href="#register">Register</a>
            </li>
            <li
              onClick={() => {
                setShowLogIn(true)
                setCurrentUser(!currentUser)
              }}
            >
              <a href="#login">Log in</a>
            </li>
          </ul>
        )}
      </ul>
      {showLogIn && <LogIn setShowLogIn={setShowLogIn} />}
      {showRegister && (
        <Registration
          setShowRegister={setShowRegister}
          setShowLogIn={setShowLogIn}
        />
      )}
    </header>
  )
}

export default NavBar
