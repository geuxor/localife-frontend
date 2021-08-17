import SearchForm from '../../components/searchForm/searchForm'
import Navbar from '../../components/navBar/NavBar'
import './landingPage.css'

export default function LandingPage() {
  return (
    <>
      <div className="background-image">
        <Navbar />
        <SearchForm />
      </div>
    </>
  )
}
