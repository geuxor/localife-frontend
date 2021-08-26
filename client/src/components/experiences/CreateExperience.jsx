import { useState } from 'react'
import { toast } from 'react-toastify'
import experiencesApi from '../../apiServices/experiencesApi'
// import { useSelector } from "react-redux";
import { CreateExperienceForm } from '../Forms/NewExperience.Form'

const NewExperience = () => {
  // state
  const [location, setLocation] = useState('Aarhus')
  const [image, setImage] = useState('')
  // const [upload, setUpload] = useState("");
  const [preview, setPreview] = useState(
    'https://via.placeholder.com/100x100.png?text=PREVIEW',
  )
  const [values, setValues] = useState({
    title: 'new Experience',
    description: 'greates experience ever',
    price: '234',
    from: '2021-07-25T17:21:18.759+0000',
    to: '',
    quantity: 10,
  })
  // from, to, quantity are ignored
  const { title, description, price } = values

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      //upload to cloudinary
      console.log('NewExperience: values.image', image)
      const uploadData = new FormData()
      uploadData.append('file', image)
      uploadData.append('upload_preset', 'mzgc3fjp')
      const res = await experiencesApi.uploadImage(uploadData)
      console.log('NewExperience: res from Cloudinary', res.data.public_id)
      const experienceData = {
        title,
        description,
        price,
        image: res.data.public_id,
      }
      console.log('NewExperience: ExperienceData', experienceData)

      let dbres = await experiencesApi.createExperience(experienceData)
      console.log('NewExperience: dbres', dbres.statusText)

      toast.success(dbres.statusText)

      //clear the form
      setValues({
        title: '',
        description: '',
        image: '',
        price: '',
        from: '',
        to: '',
        quantity: 0,
      })
    } catch (err) {
      console.log('NewExperience: err', err)
      toast.error(err.response.data)
    }
  }

  const handleImageCloud = async (files) => {
    setImage(files)
    const formData = new FormData()
    formData.append('file', image)
    formData.append('upload_preset', 'mzgc3fjp')
    formData.append('cloud_name', 'geuxor')
    console.log('NewExperience: formData', formData)
    try {
      let res = await experiencesApi.uploadImage(formData)
      console.log('NewExperience: res', res)
    } catch (err) {
      console.log('NewExperience: err', err)
    }
  }

  const handleImageChange = (files) => {
    console.log('NewExperience: handleImgChange:', files[0])
    setImage(files[0])
    setPreview(URL.createObjectURL(files[0]))
  }

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  return (
    <>
      <div className="container p-5">
        <h2>Add Experience</h2>
      </div>
      <div className="container p-5">
        <div className="">
          <div className="">
            <CreateExperienceForm
              values={values}
              setValues={setValues}
              handleChange={handleChange}
              handleImageChange={handleImageChange}
              handleSubmit={handleSubmit}
              location={location}
              setLocation={setLocation}
              handleImageCloud={handleImageCloud}
            />
          </div>
          <div className="col-2">
            <div></div>

            <img
              style={{ width: 150 }}
              src={preview}
              alt="preview_image"
              className="img img-fluid m-2"
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default NewExperience
