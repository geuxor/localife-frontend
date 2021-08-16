import LandingPage from './pages/landingPage/landingPage'
import SearchForm from './components/searchForm/searchForm'
import { BrowserRouter } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <LandingPage />
        <SearchForm />
      </BrowserRouter>
      <header className="App-header"></header>
    </div>
  )
}

export default App
