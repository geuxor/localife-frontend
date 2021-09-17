import { useEffect, useState } from 'react'
import { useAppSelector } from '../../redux/hooks'
import * as S from './styles'
import { NavLink } from 'react-router-dom'
import LogIn from '../LogIn/LogIn'
import Registration from '../registration/registration'

type Props = {
  open: boolean
}

function RightNav(props: Props): React.ReactNode {
  const [showLogIn, setShowLogIn] = useState<boolean>(false)
  const [showRegister, setShowRegister] = useState<boolean>(false)
  const [showProviderLinks, setShowProviderLinks] = useState<boolean>(false)
  const store = useAppSelector((state) => state)

  useEffect(() => {
    if (store.isLoggedIn) {
      ;(async () => {
        try {
          if (store.user.stripe_registration_complete === 'COMPLETE')
            console.log(
              'setting become provider to false',
              store.user.stripe_registration_complete,
              setShowProviderLinks(true),
            )
        } catch (err) {}
      })()
    }
  }, [])

  function resetClickHandler() {
    setShowLogIn(false)
    setShowRegister(false)
  }
  function clickLoginHandler() {
    setShowLogIn(true)
    setShowRegister(false)
  }
  function clickRegHandler() {
    setShowLogIn(false)
    setShowRegister(true)
  }

  const currentURL = window.location

  return (
    <>
      <S.Ul open={props.open}>
        <NavLink
          onClick={() => resetClickHandler()}
          to="/"
          activeStyle={{
            fontWeight: 'bold',
            color: 'white',
          }}
        >
          <li>Home</li>
        </NavLink>

        {store.isLoggedIn ? (
          <>
            {showProviderLinks ? (
              <>
                <NavLink
                  to="/experience/new"
                  activeStyle={{
                    fontWeight: 'bold',
                    color: '#0DADEA',
                  }}
                >
                  <li>Create Experience</li>
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
              </>
            ) : (
              <NavLink
                to="/become-provider"
                activeStyle={{
                  fontWeight: 'bold',
                  color: '#0DADEA',
                }}
              >
                <li>Become a Provider</li>
              </NavLink>
            )}

            <NavLink
              to="/my-bookings"
              activeStyle={{
                fontWeight: 'bold',
                color: '#0DADEA',
              }}
            >
              <li>My Bookings</li>
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
              to={currentURL}
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
              to={currentURL}
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
