import { useState } from "react";

function RatingResetControls({onReset}) {

  const [value, setValue] = useState(77);

  return <div className="rating-reset-controls">
    <button onClick={() => setValue(prev => prev - 1)}>-</button>
    <span className="rating-reset-value">{value}</span>
    <button onClick={() => setValue(prev => prev + 1)}>+</button>
    <button onClick={(e) => {
      if (window.confirm(`This will reset all current ratings to ${value}. Are you sure you want to continue?`)) {
        onReset(value)
      }
    }}>Reset</button>
  </div>
}

export default RatingResetControls;
