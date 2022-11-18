const WHITELISTED_KEYS = new Set([
  37, // left arrow
  38, // up arrow
  39, // right arrow
  40, // down arrow
  8, // backspace
  46, // delete
  9, // tab
]);

function onKeyDown(props) {
  return (e) => {
    if (!e.key.match(/^[0-9]/g) && !WHITELISTED_KEYS.has(e.keyCode)) {
      e.preventDefault();
    }
  };
}

function onBlur(props) {
  return (e) => {
    const newRating = parseInt(e.target.textContent);

    if (isNaN(newRating) || newRating < 1 || newRating > 99) {
      // New value is not a valid rating.
      e.target.textContent = props.rating;
    } else {
      props.setRating(newRating);
    }
  };
}

function onFocus(props) {
  return (e) => {
    setTimeout(function() {
      document.execCommand('selectAll', false, null)
    }, 0);
  };
}

function Rating(props) {
  const classHighLow = props.rating > props.avg ? "RatingHigh" : "RatingLow";
  return (
    <div className={`Rating ${classHighLow}`}>
      <div
        className={"RatingControls RatingIncrease " + (props.increases ? "green" : "")}
        onClick={() => props.setRating(props.rating + 1)}
      ></div>
      <div
        className="RatingValue"
        contentEditable={true}
        onKeyDown={onKeyDown(props)}
        onBlur={onBlur(props)}
        onFocus={onFocus(props)}
      >
        {props.rating}
      </div>
      <div
        className={"RatingControls RatingDecrease " + (props.decreases ? "" : "green")}
        onClick={() => props.setRating(props.rating - 1)}
      ></div>
    </div>
  );
}

export default Rating;
