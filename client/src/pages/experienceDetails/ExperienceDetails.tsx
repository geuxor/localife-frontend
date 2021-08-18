import './ExperienceDetails.css'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { filterExpById } from '../../helpers/helperFunctions'

function ExperienceDetails(props) {
  const [experience, setExperience] = useState('')
  const { id }: { id: string } = useParams()
  const numId = parseInt(id)

  useEffect(() => {
    fetch('http://localhost:4001/experiences')
      .then((response) => response.json())
      .then((experiences) => filterExpById(experiences, numId))
      .then((data) => setExperience(data))
  }, [])

  console.log(experience)

  return (
    <div className="details-container">
      <div>sdfsdfsdfd</div>
    </div>
  )
}

export default ExperienceDetails
