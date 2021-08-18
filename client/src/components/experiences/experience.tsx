import { Props } from '../../types/types'
import './experience.css'
import moment from 'moment'

function experience(props: Props): any {
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
          <button className="exp-buy-button">Buy Now</button>
        </div>
      </div>
    </div>
  )
}

export default experience
