import SearchForm from '../../components/searchForm/searchForm'
import './landingPage.css'
document.body.style.overflow = 'hidden'

export default function LandingPage() {
  return (
    <>
      <div className="background-image">
        <SearchForm />
      </div>
    </>
  )
}
