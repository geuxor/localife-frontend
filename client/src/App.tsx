import './App.css'
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from './routes/routes'
import NavBar from './components/NavBar/NavBar'

function App() {
  return (
    <div className="App">
      <NavBar />
      <Router>
        <Routes />
      </Router>
    </div>
  )
}

export default App
