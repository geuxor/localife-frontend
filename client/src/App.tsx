import React from 'react'
import './App.css'
import NavBar from './components/NavBar/NavBar'
import { Provider } from 'react-redux'
import store from './redux/store'

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <NavBar />
      </div>
    </Provider>
  )
}

export default App
