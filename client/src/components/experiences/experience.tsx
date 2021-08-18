import { Props } from '../../types/types'
import './experience.css'
import { useHistory } from 'react-router'

function Experience(props: Props): any {
  const history = useHistory()
  const handleClick = () =>
    history.push(`/result-details/${props.experience.id}`)

  return (
    <div className="exp-container2">
      <img
        src={props.experience.image}
        alt="experience"
        className="experience-image"
      />
      <div className="exp-container3">
        <div className="exp-container4">
          <div className="experience-title">{props.experience.title}</div>
          <div className="experience-description">
            {props.experience.description}
          </div>
        </div>
        <div className="exp-container5">
          <b>
            <span className="exp-price">Eur. {props.experience.price}.00</span>
          </b>
          <button
            className="exp-buy-button"
            type="button"
            onClick={handleClick}
          >
            More Info
          </button>
        </div>
      </div>
    </div>
  )
}

export default Experience
