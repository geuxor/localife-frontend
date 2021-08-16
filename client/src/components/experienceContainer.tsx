import Experience from '../components/experience'

function experienceContainer({ props }: any) {
  console.log(props)
  return (
    <div>
      <Experience experience={props.experience}></Experience>
    </div>
  )
}

export default experienceContainer
