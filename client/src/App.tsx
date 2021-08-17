import ExperienceResults from './pages/ExperienceResults'
import './App.css'
import NavBar from './components/NavBar/NavBar'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <NavBar />
        <BrowserRouter>
          <Switch>
            <Route exact path="/search-result" component={ExperienceResults} />
          </Switch>
        </BrowserRouter>
    </div>
  )
}

export default App
