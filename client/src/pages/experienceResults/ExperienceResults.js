import { useState, useEffect } from 'react'
import ExperiencesApi from '../../apiServices/experiencesApi'
import './ExperienceResults.css'
import Experience from '../../components/experiences/experience'
import Map from '../../components/Map/Map'
import { useLocation } from 'react-router-dom'
import Heart from '../../components/Spinner/Heart.Spinner'

function ExperienceResults() {
  const [experiences, setExperiences] = useState([])
  const [loading, setLoading] = useState(true)

  let search = useLocation().search
  let searchCity = new URLSearchParams(search).get('city')
  let searchCountry = new URLSearchParams(search).get('country')

  let location = {
    city: searchCity,
    country: searchCountry,
  }

  useEffect(() => {
    console.log('searchLocation:', searchCity)
    ;(async () => {
      try {
        const searchResults = await ExperiencesApi.searchExperiencesApi(
          location,
        )
        if (searchResults === [])
          throw new Error(`...nothing found in ${searchResults}`)
        setLoading(false)
      } catch (err) {
        console.log(err)
        setLoading(false)
      }
    })()
  }, [window.location.search])

  return (
    <>
      <div className="exp-container">
        <div className="results-info">
          <h2>Experiences in {location.city}</h2>
          <h4>Aug 21st to 28th</h4>
        </div>
        {loading ? (
          <Heart />
        ) : experiences.length ? (
          <>
            <div className="exp-list">
              {experiences.map((xp, i) => (
                <Experience key={i} experience={xp} />
              ))}
            </div>
            <div className="map-container">
              <Map />
            </div>
          </>
        ) : (
          <div className="no-exp">No experiences found</div>
        )}
      </div>
    </>
  )
}

export default ExperienceResults
