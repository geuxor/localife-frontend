import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import './searchForm.css'
import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete'
export default function SearchForm() {
  const history = useHistory()
  const [location, setLocation] = useState([])
  const [selectedSuggestion, setSelectedSuggestion] = useState([])
  // function handleChange(location) {
  //   setLocation(location)
  // }
  function handleSubmit(location) {
    // if (e.key === ‘Enter’ && e) {
    //   e.preventDefault(
    const matchedSuggestion = selectedSuggestion.find((suggestion) => {
      return suggestion.description === location
    })
    const { formattedSuggestion } = matchedSuggestion
    history.push(
      `/search-results?city=${formattedSuggestion.mainText}&country=${formattedSuggestion.secondaryText}`,
    )
    // e.target.value = ‘’
  }
  return (
    <PlacesAutocomplete
      onError={(e) => {
        console.log('error', e)
      }}
      value={location}
      onChange={setLocation}
      onSelect={handleSubmit}
      highlightFirstSuggestion={true}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
        setSelectedSuggestion(suggestions)
        return (
          <div className="search-container">
            <form className="search-form">
              <input
                {...getInputProps({
                  placeholder: ' I want to go to...',
                  className: 'search-term',
                  type: 'text',
                })}
              />
            </form>
            <div className="suggestions">
              {loading ? <div>...loading</div> : null}
              {suggestions.map((suggestion) => {
                console.log('SUGGESTION', suggestion)
                const style = {
                  backgroundColor: suggestion.active ? '#41B6E6' : '#fff',
                }
                return (
                  <div {...getSuggestionItemProps(suggestion, { style })}>
                    {suggestion.description}
                  </div>
                )
              })}
            </div>
          </div>
        )
      }}
    </PlacesAutocomplete>
  )
}
