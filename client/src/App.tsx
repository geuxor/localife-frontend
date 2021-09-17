import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from './routes/routes'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import NavBar from './components/Navigation/Navbar'
import { get_cookie } from './utils/cookieHandler'
import apiAuth from './apiServices/auth'
import { useAppSelector, useAppDispatch } from '../src/redux/hooks'
import { setUser, setLogIn } from './redux/actions/actions'
import Footer from './components/Footer/Footer'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useAppDispatch()
  const store = useAppSelector((state) => state)

  useEffect(() => {
    if (!store.isLoggedIn) {
      ;(async () => {
        try {
          const foundCookie = get_cookie()
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
