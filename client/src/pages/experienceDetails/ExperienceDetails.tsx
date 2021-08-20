import './ExperienceDetails.css'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { filterExpById } from '../../helpers/helperFunctions'
import { ExperienceInterface } from '../../types/types'
import DatePicker from '../../components/datePicker/DatePicker'

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
        <h1 className="details-title">{experience?.title}</h1>
        <img src={experience?.image} alt="experience" className="details-img" />
      </div>
      <div className="details-container2">
        <div className="provider-details-container">
          <div>
            <h4>An evening merging on the terminal</h4>
            <h6>hosted by Maria</h6>
            <div>
              "I have been merging all my life and I want to share my passion
              with you"
            </div>
          </div>
          <div className="details-decription">{experience?.description}</div>
        </div>
        <div className="description-details-container">
          {/* <DatePicker /> */}
        </div>
      </div>
    </div>
  )
}

export default ExperienceDetails
