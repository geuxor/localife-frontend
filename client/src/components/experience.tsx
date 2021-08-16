// import { FC } from 'react'

function experience({ experience }: any) {
  return (
    <div className="experience-container">
      <div>{experience.title}</div>
      <div>{experience.description}</div>
      <div>{experience.image}</div>
      <div>{experience.location}</div>
    </div>
  )
}

export default experience
