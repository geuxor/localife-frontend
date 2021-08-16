import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import './searchForm.css'

export default function SearchForm() {
  const history = useHistory()
  const [location, setLocation] = useState('')

  function handleSubmit(e: any) {
    if (e.key === 'Enter' && e) {
      e.preventDefault()
      console.log('LOCATION =', location)
      history.push(`/search-results?location="${location}"`)
      setLocation('')
      e.target.value = ''
    }
  }

  return (
    <div>
      <form onKeyDown={handleSubmit} className="search-form">
        <input
          autoFocus
          className="search-term"
          onChange={(e) => {
            setLocation(e.target.value)
          }}
          placeholder=" I want to go to..."
          type="text"
        />
      </form>
    </div>
  )
}
