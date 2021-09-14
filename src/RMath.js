function computeBaseSum(values) {
  return values.reduce((a, b) => a + b, 0);
}

function computeBaseAvg(values) {
  const sum = values.reduce((a, b) => a + b, 0);
  return sum / 11.0;
}

function computeCorrection(values, avg) {
  return values.reduce((acc, r) => acc + Math.max(0, r - avg), 0);
}

function computePreciseRating(values) {
  const sum = computeBaseSum(values);
  const avg = computeBaseAvg(values);
  const correction = computeCorrection(values, avg);
  const sumWithCorrection = sum + correction;
  const sumWithCorrectionRounded = Math.round(sumWithCorrection);
  return sumWithCorrectionRounded / 11.0;
}

function round_precision(n, precision) {
  const multiplier = Math.pow(10, precision);
  return Math.floor((n + Number.EPSILON) * multiplier) / multiplier;
}

function unique_ratings(ratings) {
  return new Set(ratings);
}

function ratings_change(ratings, from, to) {
  const values = [...ratings];
  values[values.indexOf(from)] = to;
  return values;
}

const RMath = {
  computeBaseSum, 
  computeBaseAvg, 
  computeCorrection, 
  computePreciseRating, 
  round_precision, 
  unique_ratings, 
  ratings_change
}

export default RMath