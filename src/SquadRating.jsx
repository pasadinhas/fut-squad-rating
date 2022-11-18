import UI from './UI'
  
function SquadRating(props) {
    const ratingIntegerPart = UI.numberIntegerPart(props.rating)
    const ratingFractionalPart = UI.numberFractionalPart(props.rating)

    const isExact = parseInt(ratingFractionalPart) === 0;

    const decimalPart = !isExact 
        ? <span className='decimal'>.{ratingFractionalPart}</span> 
        : ""
    
    return <div className='squad-rating'><span>{ratingIntegerPart}{decimalPart}</span></div>
}

export default SquadRating;