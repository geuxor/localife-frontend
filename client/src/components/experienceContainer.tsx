import Experience from '../components/experience'
import { Props } from '../types/types'

function experienceContainer(props: Props): any {
  return (
    <div>
      <Experience experience={props}></Experience>
    </div>
  )
}

export default experienceContainer
