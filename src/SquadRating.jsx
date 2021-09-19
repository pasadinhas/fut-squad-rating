import UI from './UI'
  
function SquadRating(props) {
    const ratingIntegerPart = UI.numberIntegerPart(props.rating)
    const ratingFractionalPart = UI.numberFractionalPart(props.rating)

    const isExact = parseInt(ratingFractionalPart) === 0;
    
    return <h1 style={{fontSize: '250%'}}>Rating: {ratingIntegerPart}{!isExact 
        ? <span style={{fontSize: '50%'}}>.{ratingFractionalPart}</span> 
        : ""
    }
    </h1>
}

export default SquadRating;