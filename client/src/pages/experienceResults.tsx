import Experience from '../components/experience'
import { useState, useEffect } from 'react'
import queryString from 'query-string'
import axios from 'axios'

function ExperienceResults(): any {
  const [experiences, setExperiences] = useState([])

  useEffect(() => {
    ;(async () => {
      const options: any = {
        headers: { 'Content-Type': 'application/json' },
        method: 'post',
      }
      const searchloc = queryString.parse(window.location.search)
      console.log(searchloc)
      try {
        const res = await axios.post(
          'http://localhost:4001/search-results',
          searchloc,
          options,
        )
        console.log('SEARCH RESULTS ===>', res.data)
        setExperiences(res.data)
      } catch (err) {
        console.log(err)
      }
    })()
    // eslint-disable-next-line
  }, [window.location.search])

  return (
    <div>
      {experiences.map((x, i) => (
        <Experience key={i} experience={x} />
      ))}
    </div>
  )
}

export default ExperienceResults
