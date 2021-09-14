function sum(ratings) {
  return ratings.reduce((a, b) => a + b, 0);
}

function avg(ratings) {
  return sum(ratings) / 11.0;
}

function correction(ratings) {
  const ratingsAverage = avg(ratings);
  return ratings.reduce((acc, r) => acc + Math.max(0, r - ratingsAverage), 0);
}

function rating(ratings) {
  const sumWithCorrection = sum(ratings) + correction(ratings);
  const sumWithCorrectionRounded = Math.round(sumWithCorrection);
  return sumWithCorrectionRounded / 11.0;
}

const RMath = {
  sum, 
  avg, 
  correction, 
  rating
}

export default RMath