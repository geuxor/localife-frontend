import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from './routes/routes'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import NavBar from './components/Navigation/Navbar'
import { get_cookie } from './utils/cookieHandler'
import apiAuth from './apiServices/auth'
import { useDispatch, useSelector } from 'react-redux'
import { setUser, setLogIn } from './redux/actions/actions'
import { RootState } from './redux/reducers/reducers'
import Footer from './components/Footer/Footer'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const store = useSelector((state: RootState) => state)

  useEffect(() => {
    if (!store.isLoggedIn) {
      ;(async () => {
        try {
          const foundCookie = get_cookie()
          console.log('App: cookie:', foundCookie)
          if (foundCookie) {
            let res = await apiAuth.getProfile()
            if (res.data) {
              dispatch(setUser(res.data))
              dispatch(setLogIn(true))
            } else {
              toast.error('App: Error reLogging you in - Please relogin')
            }
            setLoading(false)
          } else {
            setLoading(false)
          }
        } catch (err: any) {
          setLoading(false)
          if (err.response && err.response.status >= 400) {
            toast.error(err.response.data)
          } else {
            toast.error(err)
          }
        }
      })()
    }
  }, [])

  return (
    <>
      <div className="App">
        {!loading ? (
          <>
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
          </>
        ) : (
          <p>Wait... Im loading...</p>
        )}
      </div>
      <Footer />
    </>
  )
}

export default App
