import './App.css';
import Rating from './Rating.jsx'
import RatingChange from './RatingChange.jsx'
import React, { useState } from 'react';
import RMath from './RMath'

const BASE_RATINGS = [77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77]


function App() {


  const [ratings, baseSetRatings] = useState(BASE_RATINGS)
  const setRatings = ratings => baseSetRatings([...ratings])

  const setRating = i => r => {
    ratings[i] = r
    setRatings(ratings)
  }

  const baseAvg = RMath.computeBaseAvg(ratings)
  const rating = RMath.computePreciseRating(ratings)

  return (
    <div className="App">
      <header className="App-header">
        {ratings.map((r, i) => <Rating rating={r} setRating={setRating(i)} avg={baseAvg} />)}
      </header>


      <button onClick={() => {
        ratings.sort((a, b) => b - a)
        setRatings(ratings)
      }}>Sort Ratings</button>
      
      
      <h1>Rating: {RMath.round_precision(rating, 2)}</h1>
      <p>Average: {RMath.round_precision(RMath.computeBaseAvg(ratings), 2)}</p>
      <p>Correction: {RMath.round_precision(RMath.computeCorrection(ratings, RMath.computeBaseAvg(ratings)), 2)}</p>

      <table width="100%">
        <tr>
          <td width="50%">
            <RatingChange ratings={ratings} fn={r => r + 1} baseRating={rating} />
          </td>
          <td width="50%">
            <RatingChange ratings={ratings} fn={r => r - 1} baseRating={rating} />
          </td>
        </tr>
      </table>
      
    </div>
  );
}

export default App;
