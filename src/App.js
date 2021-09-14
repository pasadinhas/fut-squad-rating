import './App.css';
import Rating from './Rating.jsx'
import RatingChange from './RatingChange.jsx'
import React, { useState } from 'react';
import RMath from './RMath'
import UI from './UI'

const BASE_RATINGS = [77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77]


function App() {

  const [ratings, baseSetRatings] = useState(BASE_RATINGS)
  const setRatings = ratings => baseSetRatings([...ratings])

  const setRating = i => r => {
    ratings[i] = r
    setRatings(ratings)
  }

  const squadAverage = RMath.avg(ratings)
  const squadRating = RMath.rating(ratings)

  return (
    <div className="App">
      <header className="App-header">
        {ratings.map((r, i) => <Rating rating={r} setRating={setRating(i)} avg={squadAverage} />)}
      </header>

      <h1>Rating: {UI.round(squadRating)}</h1>
      <p>Average: {UI.round(RMath.avg(ratings))}</p>
      <p>Correction: {UI.round(RMath.correction(ratings, RMath.avg(ratings)))}</p>

      <button className="btn" onClick={() => {
        ratings.sort((a, b) => b - a)
        setRatings(ratings)
      }}>Sort Ratings</button>      
      
      <br/>
      <br/>
      <br/>

      <table width="100%">
        <tr>
          <td width="50%">
            <RatingChange ratings={ratings} fn={r => r + 1} baseRating={squadRating} />
          </td>
          <td width="50%">
            <RatingChange ratings={ratings} fn={r => r - 1} baseRating={squadRating} />
          </td>
        </tr>
      </table>
      
    </div>
  );
}

export default App;
