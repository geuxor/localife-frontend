import './DatePicker.css'
import { useState } from 'react'

function DatePicker() {
  const [startDate, setStartDate] = useState(new Date())
  return (
    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
  )
}

export default DatePicker
