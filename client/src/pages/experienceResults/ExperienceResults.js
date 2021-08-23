import { useState, useEffect } from 'react'
import queryString from 'query-string'
import ExperiencesApi from '../../apiServices/experiencesApi'
import './ExperienceResults.css'
import Experience from '../../components/experiences/experience'
import Map from '../../components/Map/Map'
import Spinner from '../../components/Spinner/Spinner'
import { useLocation } from 'react-router-dom'

function ExperienceResults() {
  const [experiences, setExperiences] = useState([])
  const [loading, setLoading] = useState(true)


  const searchQuery = queryString.parse(window.location.search)

  let search = useLocation().search
  let locationSearch = new URLSearchParams(search).get('location')

  useEffect(() => {
    console.log('searchLocation:', searchQuery)
      ; (async () => {
        try {
          const searchResults = await ExperiencesApi.searchExperiencesApi(
            searchQuery,
          )
          if (searchResults === [])
            throw new Error(`...nothing found in ${searchQuery.location}`)
          console.log('SEARCH RESULTS ===>', searchResults.data)
          setExperiences(searchResults.data)
          setLoading(false)
        } catch (err) {
          console.log(err)
          setLoading(false)
        }
      })()
    // eslint-disable-next-line
  }, [window.location.search])

  return (
    <>
      {console.log(experiences.data)}
      {console.log(loading)}
      <div className="exp-container">
        <div className="results-info">
          <h2>Experiences in {searchQuery.location}</h2>
          <h4>Aug 21st to 28th</h4>
        </div>
        {loading ? (
          <Spinner />
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
          <div>No experiences found</div>
        )}
      </div>
    </>
  )
}

export default ExperienceResults
