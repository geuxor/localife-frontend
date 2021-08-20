import './App.css'
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from './routes/routes'
import NavBar from './components/navBar/NavBar'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
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
