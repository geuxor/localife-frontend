import LandingPage from './pages/landingPage/landingPage'
import SearchForm from './components/searchForm/searchForm'
import './App.css'
import { BrowserRouter } from 'react-router-dom'

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
