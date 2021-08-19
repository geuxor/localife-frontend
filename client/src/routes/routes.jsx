import { Router, Switch, Route } from 'react-router-dom'
import history from './history'
import LandingPage from '../pages/landingPage/landingPage'
import ExperienceResults from '../pages/experienceResults/ExperienceResults'
import LogOut from '../components/Logout/Logout'
import ExperienceDetails from '../pages/experienceDetails/ExperienceDetails'

function Routes() {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/logout" exact component={LogOut} />
        <Route path="/search-results" exact component={ExperienceResults} />
        <Route path="/result-details/:id" exact component={ExperienceDetails} />
      </Switch>
    </Router>
  )
}

export default Routes
