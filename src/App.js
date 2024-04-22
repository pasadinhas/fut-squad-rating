import './App.css';
import Rating from './Rating.jsx'
import RatingChange from './RatingChange.jsx'
import SquadRating from './SquadRating.jsx'
import React, { useState } from 'react';
import Futwiz from './Futwiz'
import RMath from './RMath'
import UI from './UI'
import RatingResetControls from './RatingResetControls';

const SAVED_SQUADS = 'saved-squads';
const fmt = new Intl.NumberFormat();

function ratingsArrayOf(rating) {
  return new Array(11).fill(rating)
}

function ratings_change(ratings, from, to) {
  const values = [...ratings];
  values[values.indexOf(from)] = to;
  return values;
}

const BASE_RATINGS = ratingsArrayOf(80)

function fetchSavedSquads() {
  const savedSquadsStr = localStorage.getItem(SAVED_SQUADS);
  return savedSquadsStr == null ? [] : JSON.parse(savedSquadsStr)
}

function storeSavedSquads(squads) {
  localStorage.setItem(SAVED_SQUADS, JSON.stringify(squads))
}

function App() {

  console.log(Futwiz)

  const [ratings, baseSetRatings] = useState(BASE_RATINGS)
  const setRatings = ratings => baseSetRatings([...ratings])

  const [savedSquads, setSavedSquads] = useState(fetchSavedSquads())

  const setRating = i => r => {
    ratings[i] = r
    setRatings(ratings)
  }

  const squadAverage = RMath.avg(ratings)
  const squadRating = RMath.rating(ratings)
  const squadPrice = ratings.map(rating => (Futwiz.PricesByRating[rating] || [400])[0]).reduce((a, b) => a + b, 0)

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
      <div className='squad-price'>Price: {fmt.format(squadPrice)}</div>

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
        <div className='controls-row'>
          <div>
            <button className="btn" onClick={() => {
              ratings.sort((a, b) => b - a)
              setRatings(ratings)
            }}>Sort Ratings</button>
          </div>
          <div>
            <RatingResetControls onReset={value => setRatings(ratingsArrayOf(value))}/>
          </div>
          <div className='save-as'>
            <input type='text' placeholder='Save as...' style={{width: '1fr'}} id='squad-name'/>
            <button className="btn" onClick={() => {
                const name = document.getElementById('squad-name').value
                document.getElementById('squad-name').value = ''
                savedSquads[name] = [...ratings]
                storeSavedSquads(savedSquads)
                setSavedSquads({...savedSquads})
              }}>Save</button>
          </div>
        </div>
      </div>

      <div className='saved-squads'>
        {Object.entries(savedSquads).map(([squadName, squadRatings]) => <span>
          <button className='saved-squad left-rounded' onClick={() => setRatings(squadRatings)}>{squadName}</button>
          <button className='delete-saved-squad right-rounded' onClick={() => {
            if (window.confirm(`Are you sure you want to delete the saved squad '${squadName}'?`)) {
              delete savedSquads[squadName]
              storeSavedSquads(savedSquads)
              setSavedSquads({...savedSquads})
            }
          }}>🗑️</button>
        </span>)}
      </div>
    </div>
  );
}

export default App;
