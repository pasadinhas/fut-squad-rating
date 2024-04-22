const futwizPricesHtml = await fetch("https://www.futwiz.com/en/lowest-price-ratings").then(r => r.text())
const futwizPricesDocument = (new DOMParser()).parseFromString(futwizPricesHtml, "text/html")

const PricesByRating = Array.from(futwizPricesDocument.querySelectorAll(".player-ratings"))
  .filter(e => !e.style.display)
  .reduce((r, e) => {
      const key = parseInt(e.querySelector(".player-ratings-title").textContent);
      const value = Array.from(e.querySelectorAll(".player-value")).map(v => parsePrice(v.textContent))
      r[key] = value;
      return r;
  }, {})

function parsePrice(str) {
  const multiplier = str.endsWith("M") ? 1_000_000 : (str.endsWith("K") ? 1_000 : 1)
  const number = parseFloat(str)
  return number * multiplier
}

const Futwiz = {
  PricesByRating
}

export default Futwiz