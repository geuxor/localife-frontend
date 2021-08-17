import LandingPage from './pages/landingPage/landingPage'
import './App.css'
import ExperienceResults from './pages/ExperienceResults'
import NavBar from './components/NavBar/NavBar'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <NavBar />
      <BrowserRouter>
        <LandingPage />
        <Switch>
          <Route exact path="/search-results" component={ExperienceResults} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
