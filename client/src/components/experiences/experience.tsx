import { Props } from '../../types/types'
import './experience.css'
import { useHistory } from 'react-router'

function Experience(props: Props): any {
  console.log('PROPS', props)
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
            <div className="exp-price">
              <i className="euro fas fa-euro-sign"></i>
              {props.experience.price}.00
            </div>
          </b>
          <div className="exp-container6">
            <button
              className="exp-buy-button"
              type="button"
              onClick={handleClick}
            >
              More Info
            </button>
            <i className="far fa-heart"></i>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Experience
