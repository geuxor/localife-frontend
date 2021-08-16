import React from 'react'
import './App.css'
//REMOVE THIS AND OTHER SEARCH FORM CODE BEFORE SAVING
import SearchForm from './components/searchForm/searchForm'
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <SearchForm />
      </BrowserRouter>
      <header className="App-header"></header>
    </div>
  )
}

export default App
