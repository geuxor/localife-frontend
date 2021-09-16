import './counter.css'
import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState<number>(0)

  return (
    <div className="counter-container">
      <button
        onClick={() => {
          if (count !== 0) setCount(count - 1)
        }}
        className="counter-button"
      >
        -
      </button>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)} className="counter-button">
        +
      </button>
    </div>
  )
}

export default Counter
