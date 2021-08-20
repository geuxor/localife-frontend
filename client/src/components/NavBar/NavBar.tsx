import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './NavBar.css'
import Registration from '../registration/registration'
import { RootState } from '../../redux/reducers/reducers'
import LogIn from '../LogIn/LogIn'
import { setLogIn } from '../../redux/actions/actions'
import { Public } from '@material-ui/icons'

function NavBar() {
  const [showLogIn, setShowLogIn] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const state = useSelector((state: RootState) => state)
  const dispatch = useDispatch()

  return (
    <header className="header">
      <a href="/" className="logo">
        Localife
        <Public />
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
        {state.user.email ? (
          <li
            onClick={() => {
              dispatch(setLogIn())
            }}
          >
            <a href="#logout">Log out</a>
          </li>
        ) : (
          <ul>
            <li
              onClick={() => {
                setShowRegister(true)
                setShowLogIn(false)
              }}
            >
              <a href="#register">Register</a>
            </li>
            <li
              onClick={() => {
                setShowLogIn(true)
                setShowRegister(false)
                dispatch(setLogIn())
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
