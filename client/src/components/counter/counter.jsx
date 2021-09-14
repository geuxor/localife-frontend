import './counter.css'

function Counter({ onClick, onClick2, totalCount }) {
  return (
    <div className="counter-container">
      <button onClick={onClick2} className="counter-button">
        -
      </button>
      <p>{totalCount}</p>
      <button onClick={onClick} className="counter-button">
        +
      </button>
    </div>
  )
}

export default Counter
