import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import ExperiencesApi from '../../apiServices/experiencesApi'
import { useSelector } from 'react-redux'
import ExperienceEditForm from '../Forms/EditExperience'
import experienceApi from '../../apiServices/experiencesApi'
import { setEndpoint } from '../../helpers/helperFunctions'
const UpdateExperienceForm = ({ match }) => {
  const { experience } = useSelector((state) => state)
  const [, setImage] = useState('')
  const [preview, setPreview] = useState(
    'https://via.placeholder.com/100x100.png?text=PREVIEW',
  )

  const [values, setValues] = useState({
    title: '',
    description: '',
    location: '',
    price: '',
    from: '',
    to: '',
    quantity: '',
  })

  useEffect(() => {
    loadSellerExperience()
    // eslint-disable-next-line
  }, [])

  const loadSellerExperience = async () => {
    let res = await experienceApi.viewExperience(match.params.experienceId)
    // console.log(res);
    setPreview(`${setEndpoint}/experience/image/${res.data._id}`)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    let experienceData = new FormData()
    experienceData.append('title', experience.title)
    experienceData.append('description', experience.description)
    experienceData.append('location', experience.location)
    experienceData.append('price', experience.price)
    experience.image && experienceData.append('image', experience.image)
    experienceData.append('from', experience.from)
    experienceData.append('to', experience.to)
    experienceData.append('quantity', experience.quantity)

    try {
      let res = await ExperiencesApi.updateExperience(
        experienceData,
        experience.id,
      )
      console.log('RES', res)
      toast.success(`${res.data.title} is updated`)
    } catch (err) {
      console.log(err)
      toast.error(err.response.data.err)
    }
  }

  const handleImageChange = (e) => {
    // console.log(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]))
    setImage(e.target.files[0])
    console.log(preview)
  }

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  return (
    <>
      <div className="container-fluid text-center">
        <h2>Edit Experience</h2>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-10">
            <br />
            <ExperienceEditForm
              values={values}
              setValues={setValues}
              handleChange={handleChange}
              handleImageChange={handleImageChange}
              handleSubmit={handleSubmit}
            />
          </div>
          <div className="col-md-2">
            {console.log(preview, typeof preview)}
            {!preview && (
              <img
                src={preview}
                alt="preview_image"
                className="img img-fluid m-2"
              />
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default UpdateExperienceForm
