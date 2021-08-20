import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import './searchForm.css'
import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete'

export default function SearchForm() {
  const history = useHistory()
  const [location, setLocation] = useState('')

  async function handleSubmit(e: any) {
    if (e.key === 'Enter' && e) {
      e.preventDefault()
      const results = await geocodeByAddress(location)
      console.log(results)
      history.push(`/search-results?location=${location}`)
      setLocation('')
      e.target.value = ''
    }
  }

  return (
    <div>
      <PlacesAutocomplete
        value={location}
        onChange={setLocation}
        onSelect={handleSubmit}
      >
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
      </PlacesAutocomplete>
    </div>
  )
}
