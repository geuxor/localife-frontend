import { useState, useEffect } from 'react'
import ExperiencesApi from '../../apiServices/experiencesApi'
import './ExperienceResults.css'
import Experience from '../../components/experiences/experience'
import { Map } from '../../components/Map/Map'
import { useLocation } from 'react-router-dom'
import Heart from '../../components/Spinner/Heart.Spinner'
import { ExpState } from '../../types/types'

function ExperienceResults() {
  const [experiences, setExperiences] = useState<ExpState['experience']>([])
  const [loading, setLoading] = useState<boolean>(true)

  console.log(experiences)

  let search = useLocation().search
  let searchCity: string | null = new URLSearchParams(search).get('city')
  let searchCountry: string | null= new URLSearchParams(search).get('country')

  let location = {
    city: searchCity,
    country: searchCountry,
  }

  useEffect(() => {
    ;(async () => {
      try {
        const searchResults = await ExperiencesApi.searchExperiencesApi(
          location,
        )
        setExperiences(searchResults.data)
        if (searchResults === [])
          throw new Error(`...nothing found in ${searchResults}`)

        if (searchResults === [])
          throw new Error(`...nothing found in ${searchResults}`)
        await setExperiences(searchResults.data)
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
