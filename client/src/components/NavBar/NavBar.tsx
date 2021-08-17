import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './NavBar.css'
import Registration from '../registration/registration'
import {RootState} from '../../redux/reducers/reducers'

function NavBar() {
  const [currentUser, setCurrentUser] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)

  const state = useSelector((state: RootState) => state)

  console.log(state.isLoggedIn)

  const dispatch = useDispatch()

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
                setShowRegister(true)
                console.log('register')
              }}
            >
              <a href="#register">Register</a>
            </li>
            <li
              onClick={() => {
                setCurrentUser(!currentUser)
                console.log('log in')
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
      {showRegister && <Registration />}
    </header>
  )
}

export default NavBar
