import ExperienceContainer from '../components/experience'
import { ExperienceInterface } from '../types/types'

const mockData: ExperienceInterface = {
  id: '23123213',
  title: 'Bungee jumping',
  description:
    'jumping off stuff with a rope adn trying not to fall to the ground',
  image: 'img.jpeg',
  location: 'barcelona',
}

function experienceResults(): any {
  return (
    <div>
      <ExperienceContainer experience={mockData}></ExperienceContainer>
    </div>
  )
}

export default experienceResults
