import './App.css'
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from './routes/routes'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Menu from './components/Menu/Navbar'

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
