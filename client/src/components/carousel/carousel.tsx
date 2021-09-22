import { Carousel } from 'antd'
import './carousel.css'
import { Cloudinary } from 'cloudinary-core'

function ImgCarousel() {
  const cloudinaryCore = new Cloudinary({
    cloud_name: process.env.REACT_APP_CLOUD_NAME,
    secure: true,
  })
  const SampleImg = () => (
    <img
      src={cloudinaryCore.url(
        'https://res.cloudinary.com/geuxor/image/upload/v1615560218/ie7cuv27yomwcu6kskgz24eaur4n.jpg',
      )}
      alt="photosOfExperience"
    ></img>
  )

  return (
    <div>
      <Carousel
        className="banner"
        style={{
          height: '160px',
          color: '#fff',
          lineHeight: '100px',
          textAlign: 'center',
          background: '#234f6d',
        }}
        autoplay
      >
        {SampleImg()}
      </Carousel>
    </div>
  )
}
export default ImgCarousel

// {images.map((image) => (
//   <div
//     key={image.key}
//     className="d-flex flex-row justify-content-center py-2"
//   >
//     <div className="align-self-center px-4">
//       <AdvancedImage
//         className="cloudimg"
//         cldImg={new CloudinaryImage(image, cloudConfig, urlConfig)}
//       />
//     </div>
//   </div>
// ))}

// let cloudConfig = new CloudConfig({ cloudName: 'geuxor' })
// let urlConfig = new URLConfig({ secure: true })
