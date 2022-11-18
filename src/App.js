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

function ratings_change(ratings, from, to) {
  const values = [...ratings];
  values[values.indexOf(from)] = to;
  return values;
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

  const squadRatingInteger = UI.numberIntegerPart(squadRating)
  const ratingChanges = [...new Set(ratings)].map(rating => {
    const ratingWithIncrease = UI.numberIntegerPart(RMath.rating(ratings_change(ratings, rating, rating + 1)));
    const ratingWithDecrease = UI.numberIntegerPart(RMath.rating(ratings_change(ratings, rating, rating - 1)));

    return {
      rating: rating,
      decreases: ratingWithDecrease < squadRatingInteger,
      increases: ratingWithIncrease > squadRatingInteger
    }
  }).reduce((result, current) => {
    result[current.rating] = current;
    return result;
  }, {});

  return (
    <div className="App">
      <SquadRating rating={squadRating} />

      <div className='ratings-wrapper'>
        <div className='ratings'>
          {ratings.map((r, i) => <Rating 
            decreases={ratingChanges[r].decreases} 
            increases={ratingChanges[r].increases} 
            rating={r} 
            setRating={setRating(i)} 
            avg={squadAverage} 
          />)}
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
    </div>
  );
}

export default App;
