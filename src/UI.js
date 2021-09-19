function round(n, precision) {
  const p = precision ?? 2;
  const multiplier = Math.pow(10, p);
  return Math.floor((n + Number.EPSILON) * multiplier) / multiplier;
}

function numberIntegerPart(n) {
  return parseInt(n).toString()
}

function numberFractionalPart(n) {
  const fractional = n - numberIntegerPart(n)
  return zeroFill(parseInt(fractional * Math.pow(10, 2)), 2)
}

function zeroFill(n, minLength) {
  console.log({n, minLength})
  let nStr = n.toString()
  let nbZeroes = Math.max(0, minLength - nStr.length)
  return `${ '0'.repeat(nbZeroes) }${ nStr }`
}

const UI = {
  round,
  numberIntegerPart,
  numberFractionalPart,
  zeroFill
}

export default UI