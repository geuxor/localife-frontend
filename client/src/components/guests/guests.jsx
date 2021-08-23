import './guests.css'
import { DropdownButton, Dropdown } from 'react-bootstrap'
import Counter from '../../components/counter/counter'

function Guests() {
  return (
    <div>
      <DropdownButton
        id="dropdown-basic-button"
        title="Guests"
        autoClose="outside"
        active="false"
      >
        <Dropdown className="dropdown-adults">
          <div className="dropdown-adults-inline">
            Adults <Counter />
          </div>
        </Dropdown>
        <Dropdown className="dropdown-children">
          <div className="dropdown-children-inline">
            Children <Counter />
          </div>
        </Dropdown>
      </DropdownButton>
    </div>
  )
}

export default Guests
