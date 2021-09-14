function Rating(props) {
  return (
    <div className={`Rating ${props.rating > props.avg ? 'RatingHigh' : 'RatingLow'}`}>
        <div className="RatingControls RatingIncrease" onClick={() => props.setRating(props.rating + 1)}></div>
        <div className="RatingValue">{props.rating}</div>
        <div className="RatingControls RatingDecrease" onClick={() => props.setRating(props.rating - 1)}></div>
    </div>
  );
}

export default Rating;
