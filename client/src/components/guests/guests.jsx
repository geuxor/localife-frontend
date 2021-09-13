import './guests.css'
import { DropdownButton, Dropdown } from 'react-bootstrap'
import Counter from '../../components/counter/counter'

function Guests() {
  return (
    <div className="guest-container">
      <DropdownButton
        id="dropdown-basic-button"
        title="Guests"
        autoClose="outside"
        active="false"
      >
        <div className="dropdown-container">
          <Dropdown className="dropdown-adults">
            <span> Adults </span>
            <div className="dropdown-adults-inline">
              <Counter />
            </div>
          </Dropdown>
          <Dropdown className="dropdown-children">
            Children
            <div className="dropdown-children-inline">
              <Counter />
            </div>
          </Dropdown>
        </div>
      </DropdownButton>
    </div>
  )
}

export default Guests
