import React from 'react'
import './NavBar.css'

function NavBar() {
  return (
    <header className="header">
      <a href="a" className="logo">
        CSS Nav
      </a>
      <input className="menu-btn" type="checkbox" id="menu-btn" />
      <label className="menu-icon" htmlFor="menu-btn">
        <span className="navicon"></span>
      </label>
      <ul className="menu">
        <li>
          <a href="#work">About</a>
        </li>
        <li>
          <a href="#about">Register</a>
        </li>
        <li>
          <a href="#careers">Log in</a>
        </li>
        <li>
          <a href="#contact">Contact</a>
        </li>
      </ul>
    </header>
  )
}

export default NavBar
