import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from './routes/routes'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// import NavMenu from './components/Navigation/Navbar'
import Menu from './components/Menu/Navbar'
import Footer from './components/Footer/Footer'
import { get_cookie } from './utils/cookieHandler'
import apiAuth from './apiServices/auth'
import { useDispatch, useSelector } from 'react-redux'
import { setUser, setLogIn } from './redux/actions/actions'
import { RootState } from './redux/reducers/reducers'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const store = useSelector((state: RootState) => state)

  useEffect(() => {
    if (!store.isLoggedIn) {
      ;(async () => {
        try {
          const sid = get_cookie()
          console.log('App: cookie:', sid)
          if (sid) {
            let res = await apiAuth.getProfile()
            console.log('App: profile response:', res.data)
            if (res.data) {
              console.log('App: reLoggedIn SUCCESSFULL ===> ')
              dispatch(setUser(res.data))
              dispatch(setLogIn(true))
            } else {
              console.log('App: err relogging - redirect to login')
              toast.error('App: Error reLogging you in - Please relogin')
            }
            setLoading(false)
          } else {
            setLoading(false)
          }
        } catch (err) {
          setLoading(false)
          if (err.response && err.response.status >= 400) {
            console.log('err:', err.response.data)
            toast.error(err.response.data)
          } else {
            console.log(err)
            toast.error(err)
          }
        }
      })()
    }
  }, [])

  return (
    <div className="App">
      {!loading ? (
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
          <Footer />
          <Routes />
        </Router>
      ) : (
        <p>Wait... Im loading...</p>
      )}
    </div>
  )
}

export default App
