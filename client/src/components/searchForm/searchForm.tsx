// import React from 'react'
import './searchForm.css'

export default function SearchForm() {
  function handleSubmit(e: any) {
    if (e.key === 'Enter') {
      // e.preventDefault()
      console.log(e.target.value)
    }
    // e.preventDefault()
    // try {
    //   if (e.key === 'Enter') {
    //     if (!e) {
    //       return
    //     } else {
    //       console.log('hello')
    //     }
    //   }
    // } catch (e) {
    //   console.log(e)
    // }
  }

  return (
    <div>
      <form onKeyDown={handleSubmit} className="search-form">
        <input
          autoFocus
          className="search-term"
          // onChange={(e) => console.log(e.target.value)}
          placeholder=" I want to go to..."
          type="text"
        />
      </form>
    </div>
  )
}
