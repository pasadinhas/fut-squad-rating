function round(n, precision) {
  const p = precision ?? 2;
  const multiplier = Math.pow(10, p);
  return Math.floor((n + Number.EPSILON) * multiplier) / multiplier;
}

const UI = {
  round
}

export default UI