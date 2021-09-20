import { Switch, Route } from 'react-router-dom'
import PrivateRoute from '../components/Navigation/PrivateRoute.component'
import LandingPage from '../pages/landingPage/landingPage'
import ExperienceResults from '../pages/experienceResults/ExperienceResults'
import LogOut from '../components/Logout/Logout'
import BecomeProvider from '../components/Provider/BecomeProvider'
import StripeSuccess from '../Stripe/StripeSuccess.component'
import ExperienceDetails from '../pages/experienceDetails/ExperienceDetails'
import StripeRedirect from '../Stripe/StripeRedirect.component'
import MyBookings from '../pages/myBookingsPage/MyBookings'
import Dashboard from '../components/Provider/Dashboard.component'
import CreateExperienceForm from '../components/experiences/CreateExperience'
import BookingDetails from '../pages/BookingDetails/BookingDetails'
import UpdateExperienceForm from '../components/Forms/UpdateExperience.Form'

function Routes() {
  return (
    <div>
      <Switch>
        <Route path="/result-details/:id" exact component={ExperienceDetails} />
        <Route path="/search-results" exact component={ExperienceResults} />
        <Route path="/stripe/success/:id" exact component={StripeSuccess} />
        <Route path="/stripe/redirect" exact component={StripeRedirect} />

        <PrivateRoute
          path="/experience/edit/:id"
          exact
          component={UpdateExperienceForm}
        />
        <PrivateRoute
          path="/experience/new"
          exact
          component={CreateExperienceForm}
        />

        <PrivateRoute path="/bookings" exact component={MyBookings} />
        <PrivateRoute path="/booking/:id" exact component={BookingDetails} />
        <PrivateRoute path="/my-bookings" exact component={MyBookings} />
        <PrivateRoute path="/dashboard" exact component={Dashboard} />
        <PrivateRoute
          path="/become-provider"
          exact
          component={BecomeProvider}
        />
        <Route path="/logout" exact component={LogOut} />
        <Route path="/" exact component={LandingPage} />
      </Switch>
    </div>
  )
}

export default Routes
