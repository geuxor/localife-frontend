import './ExperienceDetails.css'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { filterExpById } from '../../helpers/helperFunctions'
import { ExperienceInterface } from '../../types/types'

function ExperienceDetails(props) {
  const [experience, setExperience] = useState<ExperienceInterface>()

  const { id }: { id: string } = useParams()
  const numId = parseInt(id)

  useEffect(() => {
    fetch('http://localhost:4001/experiences')
      .then((response) => response.json())
      .then((experiences) => filterExpById(experiences, numId))
      .then((data) => setExperience(data))
  }, [])

  return (
    <div className="details-container">
      <div className="title-img-details-container">
        <div>title</div>
        <div>images</div>
      </div>
      <div className="details-container2">
        <div className="provider-details-container">
          <div>Provider</div>
          <div>Description</div>
        </div>
        <div className="description-details-container">
          <div>Booking Box</div>
        </div>
      </div>
      {/* <div>sdsd</div>
      <div>pppp</div>
      <div className="details-container2">
        <div className="details-title">{experience?.title}</div>
        <img
          src={experience?.image}
          alt="experience details"
          className="details-img"
        />
        <div>{experience?.description}</div>
        <div>{experience?.location}</div>
      </div> */}
    </div>
  )
}

export default ExperienceDetails
