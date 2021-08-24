import { Switch, Route } from 'react-router-dom'
import PrivateRoute from '../components/Navigation/PrivateRoute.component'
import LandingPage from '../pages/landingPage/landingPage'
import ExperienceResults from '../pages/experienceResults/ExperienceResults'
import LogOut from '../components/Logout/Logout'
import BecomeProvider from '../components/Provider/BecomeProvider'
import StripeSuccess from '../Stripe/StripeSuccess.component'
import ExperienceDetails from '../pages/experienceDetails/ExperienceDetails'
import StripeRedirect from '../Stripe/StripeRedirect.component'
import Bookings from '../components/Bookings/bookings.component'
import Dashbaord from '../components/Provider/Dashboard.component'
import CreateExperienceForm from '../components/experiences/CreateExperience'
import MyBookings from '../pages/myBookingsPage/MyBookings'

function Routes() {
  return (
    <div>
      <Switch>
        <Route path="/result-details/:id" exact component={ExperienceDetails} />
        <Route path="/stripe/success/:id" exact component={StripeSuccess} />
        <Route path="/stripe/redirect" exact component={StripeRedirect} />
        <PrivateRoute path="/bookings" exact component={Bookings} />
        <PrivateRoute path="/dashboard" exact component={Dashbaord} />
        <PrivateRoute
          path="/experience/new"
          exact
          component={CreateExperienceForm}
        />
        <PrivateRoute
          path="/become-provider"
          exact
          component={BecomeProvider}
        />
        <Route path="/logout" exact component={LogOut} />
        <Route path="/search-results" exact component={ExperienceResults} />
        <Route path="/" exact component={LandingPage} />
        <Route path="/my-bookings" exact component={MyBookings} />
      </Switch>
    </div>
  )
}

export default Routes
