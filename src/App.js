import './App.css';
import Rating from './Rating.jsx'
import RatingChange from './RatingChange.jsx'
import SquadRating from './SquadRating.jsx'
import React, { useState } from 'react';
import RMath from './RMath'
import UI from './UI'
import RatingResetControls from './RatingResetControls';

function ratingsArrayOf(rating) {
  return new Array(11).fill(rating)
}

const BASE_RATINGS = ratingsArrayOf(80)


function App() {

  const [ratings, baseSetRatings] = useState(BASE_RATINGS)
  const setRatings = ratings => baseSetRatings([...ratings])

  const setRating = i => r => {
    ratings[i] = r
    setRatings(ratings)
  }

  const squadAverage = RMath.avg(ratings)
  const squadRating = RMath.rating(ratings)

  const notices = [];
  if (UI.isInteger(squadRating)) {
    notices.push(<><span className='emoji'>✅</span> The squad rating is a whole number!</>)
  } else {
    notices.push(<><span className='emoji'>⚠️</span> The squad rating has a decimal part. You can decrease some ratings.</>)
  }
  

  return (
    <div className="App">
      <SquadRating rating={squadRating} />

      <div className='ratings-wrapper'>
        <div className='ratings'>
          {ratings.map((r, i) => <Rating rating={r} setRating={setRating(i)} avg={squadAverage} />)}
        </div>
      </div>


      <div className='controls'>
        <div>
          <button className="btn" onClick={() => {
            ratings.sort((a, b) => b - a)
            setRatings(ratings)
          }}>Sort Ratings</button>
        </div>
        <div>
          <RatingResetControls onReset={value => setRatings(ratingsArrayOf(value))}/>
        </div>
      </div>
          
      <div className='notices'>
        {notices.map(notice => <p>{notice}</p>)}
      </div>
    </div>
  );
}

export default App;
