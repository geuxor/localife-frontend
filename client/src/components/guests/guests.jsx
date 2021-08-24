import './guests.css'
import { DropdownButton, Dropdown } from 'react-bootstrap'
import Counter from '../../components/counter/counter'

function Guests() {
  return (
    <div>
      <DropdownButton
        id="dropdown-basic-button"
        title="Guests"
        //collect counter num state from counter and update title/placeholder text with current counter state
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
