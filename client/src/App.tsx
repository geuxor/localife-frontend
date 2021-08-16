import ExperienceResults from './pages/experienceResults'
import './App.css'
import { Experience } from './types/types'

const mockData: Experience = {
  id: '23123213',
  title: 'Bungee jumping',
  description: 'jumping off stuff with a rope',
  image: 'img.jpeg',
  location: 'barcelona',
}

function App(): any {
  return (
    <div className="App">
      <ExperienceResults
        experience={mockData}
        banana={'rama'}
      ></ExperienceResults>
    </div>
  )
}

export default App
