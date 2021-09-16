import './guests.css'
import { DropdownButton, Dropdown } from 'react-bootstrap'
import Counter from '../counter/counter'
import { useState } from 'react'

function Guests() {
  const [adultCount, setAdultCount] = useState<number>(0)
  const [childCount, setChildCount] = useState<number>(0)

  const incrementAdult = () => {
    setAdultCount(adultCount + 1)
  }
  const decrementAdult = () => {
    if (adultCount != 0) setAdultCount(adultCount - 1)
  }
  const incrementChild = () => {
    setChildCount(childCount + 1)
  }
  const decrementChild = () => {
    if (childCount != 0) setChildCount(childCount - 1)
  }

  const numOfGuests = `Total guests: ${adultCount + childCount}`

  return (
    <div className="guest-container">
      <DropdownButton
        id="dropdown-basic-button"
        title={numOfGuests}
        autoClose="outside"
        active="false"
      >
        <div className="dropdown-container">
          <Dropdown className="dropdown-adults">
            <span> Adults </span>
            <div className="dropdown-adults-inline">
              <Counter
                totalCount={adultCount}
                onClick={incrementAdult}
                onClick2={decrementAdult}
              />
            </div>
          </Dropdown>
          <Dropdown className="dropdown-children">
            Children
            <div className="dropdown-children-inline">
              <Counter
                totalCount={childCount}
                onClick={incrementChild}
                onClick2={decrementChild}
              />
            </div>
          </Dropdown>
        </div>
      </DropdownButton>
    </div>
  )
}

export default Guests
