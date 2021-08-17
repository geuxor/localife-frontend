import { Router, Switch, Route } from 'react-router-dom'

import history from './history'
import App from '../App'
import LandingPage from '../pages/landingPage/landingPage'
import ExperienceResults from '../pages/experienceResults/ExperienceResults'

function Routes() {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/search-results" exact component={ExperienceResults} />
      </Switch>
    </Router>
  )
}

export default Routes
