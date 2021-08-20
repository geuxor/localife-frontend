import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Routes from './routes/routes'
import NavBar from './components/NavBar/NavBar'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Menu from './components/Menu/Navbar'
import LandingPage from './pages/landingPage/landingPage'
import ExperienceResults from './pages/experienceResults/ExperienceResults'
import LogOut from './components/Logout/Logout'
import BecomeProvider from './components/Provider/BecomeProvider'
import StripeSuccess from './Stripe/StripeSuccess.component'

function App() {
  return (
    <div className="App">
      <Router>
        <Menu />
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Routes />
      </Router>
    </div>
  )
}

export default App
