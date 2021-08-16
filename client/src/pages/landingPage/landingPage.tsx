import Unsplash from 'react-unsplash-wrapper'

export default function LandingPage() {
  return (
    <div className="background">
      <Unsplash
        keywords="destinations"
        width="3840"
        height="2160"
        expand="true"
      />
    </div>
  )
}
