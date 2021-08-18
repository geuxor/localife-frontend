import { useState, useEffect } from 'react'
import queryString from 'query-string'
import ExperiencesApi from '../../apiServices/experiencesApi'
import './ExperienceResults.css'
import Experience from '../../components/experiences/experience'

function ExperienceResults(): any {
  const [experiences, setExperiences] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const searchQuery = queryString.parse(window.location.search)
    console.log('searchLocation:', searchQuery)
    ;(async () => {
      try {
        const searchResults = await ExperiencesApi.searchExperiencesApi(
          searchQuery,
        )
        if (searchResults === [])
          throw new Error(`...nothing found in ${searchQuery.location}`)
        console.log('SEARCH RESULTS ===>', searchResults)
        setExperiences(searchResults)
        console.log(experiences.length)

        setLoading(false)
      } catch (err) {
        console.log(err)
        setLoading(false)
      }
    })()
    // eslint-disable-next-line
  }, [window.location.search])

  return (
    <div className="exp-container">
      <h1>Experiences in Barcelona</h1>
      <h4>Aug 21st to 28th</h4>
      {!loading ? (
        experiences.length !== 0 ? (
          experiences.map((xp, i) => <Experience key={i} experience={xp} />)
        ) : (
          <div className="pt-5">nothing found...</div>
        )
      ) : (
        <div>Loading patiently...</div>
      )}
    </div>
  )
}

export default ExperienceResults
