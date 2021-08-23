import './DatePicker.css'
import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

function DatePick() {
  const [startDate, setStartDate] = useState(null)
  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      showTimeSelect
      timeFormat="HH:mm"
      timeIntervals={60}
      timeCaption="time"
      dateFormat="MMMM d, yyyy h:mm aa"
      placeholderText="Select a date"
      className="datepicker"
    />
  )
}

export default DatePick
