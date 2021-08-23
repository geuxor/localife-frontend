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
