import LandingPage from './pages/landingPage/landingPage'
import './App.css'
import ExperienceResults from './pages/ExperienceResults'
import NavBar from './components/NavBar/NavBar'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store'

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <NavBar />
        <BrowserRouter>
          <LandingPage />
          <Switch>
            <Route exact path="/search-results" component={ExperienceResults} />
          </Switch>
        </BrowserRouter>
      </div>
    </Provider>
  )
}

export default App
