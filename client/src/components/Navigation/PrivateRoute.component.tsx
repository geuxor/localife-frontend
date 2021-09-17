import { Route, Redirect } from 'react-router-dom'
import { useAppSelector } from '../../redux/hooks'

const PrivateRoute: React.ComponentType<any> = ({
  component: Component,
  ...rest
}) => {
  const { isLoggedIn } = useAppSelector((state) => state)

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
