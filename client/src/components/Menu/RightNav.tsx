import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/reducers/reducers'
import * as S from './styles'
import { NavLink } from 'react-router-dom'
import { setLogIn } from '../../redux/actions/actions'
import LogIn from '../LogIn/LogIn'
import Registration from '../registration/registration'
import { useHistory } from 'react-router-dom'

import LogOut from '../Logout/Logout'
type Props = {
  open: boolean
}

function RightNav(props: Props) {
  const [showLogIn, setShowLogIn] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const state = useSelector((state: RootState) => state)
  const history = useHistory()
  const dispatch = useDispatch()

  function resetClickHandler() {
    setShowLogIn(false)
    setShowRegister(false)
  }
  function clickLoginHandler() {
    setShowLogIn(true)
    setShowRegister(false)
    console.log('xx')
    console.log('showLogIn', showLogIn, 'showRegister', showRegister)
  }
  function clickRegHandler() {
    setShowLogIn(false)
    setShowRegister(true)
    console.log('xx')
    console.log('showLogIn', showLogIn, 'showRegister', showRegister)
  }

  //why page doesn't change when clicking logout??? or others
  return (
    <>
      <S.Ul open={props.open}>
        <NavLink
          onClick={() => resetClickHandler()}
          to="/about"
          activeStyle={{
            fontWeight: 'bold',
            color: '#0DADEA',
          }}
        >
          <li>About</li>
        </NavLink>

        {state.user.email ? (
          <>
            <NavLink
              to="/become-provider"
              activeStyle={{
                fontWeight: 'bold',
                color: '#0DADEA',
              }}
            >
              <li>Become a Provider</li>
            </NavLink>
            <NavLink
              to="/stripe/success"
              activeStyle={{
                fontWeight: 'bold',
                color: '#0DADEA',
              }}
            >
              <li>Stripe Success</li>
            </NavLink>
            <NavLink
              exact
              to={'/dashboard'}
              activeStyle={{
                fontWeight: 'bold',
                color: '#0DADEA',
              }}
            >
              <li>Dashboard</li>
            </NavLink>
            <NavLink
              to="/logout"
              activeStyle={{
                fontWeight: 'bold',
                color: '#0DADEA',
              }}
            >
              <li>Logout</li>
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              to="/#register"
              onClick={() => clickRegHandler()}
              activeStyle={{
                fontWeight: showRegister ? 'bold' : 'normal',
                color: showRegister ? '#0DADEA' : '#000',
              }}
            >
              <li>Register</li>
            </NavLink>

            <NavLink
              onClick={() => clickLoginHandler()}
              to="/#login"
              className=""
              activeStyle={{
                fontWeight: showLogIn ? 'bold' : 'normal',
                color: showLogIn ? '#0DADEA' : '#000',
              }}
            >
              <li>Login</li>
            </NavLink>
          </>
        )}
      </S.Ul>

      {showLogIn && <LogIn setShowLogIn={setShowLogIn} />}
      {showRegister && (
        <Registration
          setShowRegister={setShowRegister}
          setShowLogIn={setShowLogIn}
        />
      )}
    </>
  )
}

export default RightNav
