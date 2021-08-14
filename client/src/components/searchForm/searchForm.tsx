// import React from 'react'
import './searchForm.css'

export default function SearchForm() {
  function handleSubmit(e: any) {
    // e.preventDefault()
    try {
      if (!e) {
        return
      } else {
        console.log(e)
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="search-form">
        <input
          autoFocus
          className="search-term"
          onChange={(e) => console.log(e.target.value)}
          placeholder=" I want to go to..."
          type="text"
        />
      </form>
    </div>
  )
}
