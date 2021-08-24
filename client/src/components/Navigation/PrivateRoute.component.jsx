import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isLoggedIn } = useSelector((state) => ({ ...state }))
  console.log(isLoggedIn)
  isLoggedIn
    ? console.log('privateRoute: loggedIn!')
    : console.log('privateRoute: NOT loggedIn! - redirect to homepage')

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  )
}

export default PrivateRoute
