import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import './searchForm.css'
import PlacesAutocomplete, { Suggestion } from 'react-places-autocomplete'
export default function SearchForm() {
  const history = useHistory()
  const [location, setLocation] = useState([] as any)
  const [selectedSuggestion, setSelectedSuggestion] = useState(
    [] as any[] | readonly Suggestion[],
  )

  function handleSubmit(location) {
    const matchedSuggestion = (selectedSuggestion as any[]).find(
      (suggestion) => {
        return suggestion.description === location
      },
    )
    const { formattedSuggestion } = matchedSuggestion
    history.push(
      `/search-results?city=${formattedSuggestion.mainText}&country=${formattedSuggestion.secondaryText}`,
    )
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
            <input
              {...getInputProps({
                placeholder: ' I want to go to...',
                className: 'search-term',
                type: 'text',
                autoFocus: true,
              })}
            />
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
