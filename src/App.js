import './App.css';
import Rating from './Rating.jsx'
import React, { useState } from 'react';


function computeBaseSum(values) {
  return values.reduce((a,b) => a+b, 0)
}

function computeBaseAvg(values) {
  const sum = values.reduce((a,b) => a+b, 0)
  return sum / 11.0
}

function computeCorrection(values, avg) {
  return values.reduce((acc, r) => acc + Math.max(0, r - avg), 0)
}

function computePreciseRating(values) {
  const sum = computeBaseSum(values)
  const avg = computeBaseAvg(values)
  const correction = computeCorrection(values, avg)
  const sumWithCorrection = sum + correction
  const sumWithCorrectionRounded = Math.round(sumWithCorrection)
  return sumWithCorrectionRounded / 11.0
}

function computeRating(values) {
  return Math.floor(computePreciseRating(values))
}

function round_precision(n, precision) {
  const multiplier = Math.pow(10, precision)
  return Math.floor((n + Number.EPSILON) * multiplier) / multiplier
}

function rating_values(ratings) {
  return ratings.map(r => r.rating)
}

function unique_ratings(ratings) {
  const set = new Set(rating_values(ratings))
  console.log(set)
  return set
}

function ratings_change(ratings, from, to) {
  const values = rating_values(ratings)
  console.log(values)
  values[values.indexOf(from)] = to
  console.log(values)
  return values
}

function App() {

  const ratings = []
  for (let i = 0; i < 11; i++) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [rating, setRating] = useState(parseInt(77))
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [order, setOrder] = useState(i)
    ratings.push({rating, setRating, order, setOrder})
  }

  ratings.sort((a, b) => a.order - b.order)
  const ratingValues = ratings.map(r => r.rating)

  const baseAvg = computeBaseAvg(ratingValues)
  const rating = computePreciseRating(ratingValues)

  return (
    <div className="App">
      <header className="App-header">
        {ratings.map(r => <Rating rating={r.rating} setRating={r.setRating} avg={baseAvg} />)}

      </header>
      <button onClick={() => {
        ratings.sort((a, b) => b.rating - a.rating)
        for (let i = 0; i < 11; i++) {
          ratings[i].setOrder(i)
        }
      }}>Sort Ratings</button>
      <p>Average: {round_precision(computeBaseAvg(ratingValues), 2)}</p>
      <p>Correction: {round_precision(computeCorrection(ratingValues, computeBaseAvg(ratingValues)), 2)}</p>
      <p>Rating: {round_precision(rating, 2)}</p>

      <table width="100%">
        <tr>
          <td width="50%">
            <table>
              <tr>
                <td>Change</td>
                <td>New Rating</td>
                <td>Diff</td>
              </tr>
              {[...unique_ratings(ratings)].sort().map(r => {
                const newRating = computePreciseRating(ratings_change(ratings, r, r+1))
                return <tr>
                  <td>{r} -&gt; {r+1}</td>
                  <td>{round_precision(newRating, 2)}</td>
                  <td>{round_precision(newRating - rating, 2)}</td>
                </tr>
              })}
            </table>
          </td>
          <td width="50%">
            <table>
              <tr>
                <td>Change</td>
                <td>New Rating</td>
                <td>Diff</td>
              </tr>
              {[...unique_ratings(ratings)].sort().map(r => {
                const newRating = computePreciseRating(ratings_change(ratings, r, r-1))
                return <tr>
                  <td>{r} -&gt; {r-1}</td>
                  <td>{round_precision(newRating, 2)}</td>
                  <td>{round_precision(newRating - rating, 2)}</td>
                </tr>
              })}
            </table>
          </td>
        </tr>
      </table>
      
    </div>
  );
}

export default App;
