import { Props } from '../../types/types'
import './experience.css'

function experience(props: Props): any {
  return (
    <div className="experience-container">
      <div className="experience-image">{props.experience.image}</div>
      <div className="experience-container2">
        <div className="experience-title">{props.experience.title}</div>
        <div className="experience-description">
          {props.experience.description}
        </div>
      </div>
    </div>
  )
}

export default experience
