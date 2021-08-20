import { BrowserRouter, Switch, Route } from 'react-router-dom'
import history from './history'
import LandingPage from '../pages/landingPage/landingPage'
import ExperienceResults from '../pages/experienceResults/ExperienceResults'
import LogOut from '../components/Logout/Logout'
import BecomeProvider from '../components/Provider/BecomeProvider'
import StripeSuccess from '../Stripe/StripeSuccess.component'

function Routes() {
  return (
    <div>
      <Switch>
        <Route path="/stripe/success" exact component={StripeSuccess} />
        <Route path="/become-provider" exact component={BecomeProvider} />
        <Route path="/logout" exact component={LogOut} />
        <Route path="/search-results" exact component={ExperienceResults} />
        <Route path="/" exact component={LandingPage} />
      </Switch>
    </div>
  )
}

export default Routes
