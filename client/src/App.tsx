import ExperienceResults from './pages/experienceResults'
import './App.css'
import NavBar from './components/NavBar/NavBar'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <NavBar />
      <div className="container">
        <BrowserRouter>
          <Switch>
            <Route exact path="/search-result" component={ExperienceResults} />
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  )
}

export default App
