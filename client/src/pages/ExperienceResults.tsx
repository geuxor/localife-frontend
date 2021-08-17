// import Experience from '../components/experiences/experience'
import { useState, useEffect } from 'react'
import queryString from 'query-string'
import ExperiencesApi from '../apiServices/experiencesApi'
import './ExperienceResults.css'
import Card from '../components/Design/Card.component'

function ExperienceResults(): any {
  const [experiences, setExperiences] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const searchQuery = queryString.parse(window.location.search)
    console.log('searchLocation:', searchQuery)
    ;(async () => {
      try {
        const searchResults = await ExperiencesApi.searchExperiencesApi(searchQuery)
        if (searchResults === []) throw new Error(`...nothing found in ${searchQuery.location}`)
        console.log('SEARCH RESULTS ===>', searchResults)
        setExperiences(searchResults)
        console.log(experiences.length);
        
        setLoading(false)
      } catch (err) {
        console.log(err)
        setLoading(false)
      }
    })()
    // eslint-disable-next-line
  }, [window.location.search])

  return (
    <div className="d-flex row pt-5">
      {!loading ? (
        experiences.length !== 0 ? (
          experiences.map((xp, i) => <Card key={i} experience={xp} />)
        ) : (
          <div className="pt-5">nothing found...</div>
        )
      ) : (
        <div>Loading paciently...</div>
      )}
    </div>
  )
}

export default ExperienceResults
