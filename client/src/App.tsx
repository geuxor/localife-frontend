import LandingPage from './pages/landingPage/landingPage'
import './App.css'
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
      <header className="App-header"></header>
    </div>
  )
}

export default App
