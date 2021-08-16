import ExperienceContainer from '../components/experience'
import { Experience } from '../types/types'
interface ExperienceResultsProps {
  experience: Experience
  banana: String
}

function experienceResults(props: ExperienceResultsProps): any {
  return (
    <div>
      <ExperienceContainer experience={props.experience}></ExperienceContainer>
    </div>
  )
}

export default experienceResults
