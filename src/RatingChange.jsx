import RMath from './RMath'
import UI from './UI'

function ratings_change(ratings, from, to) {
  const values = [...ratings];
  values[values.indexOf(from)] = to;
  return values;
}

function Rating(props) {

  const uniqueRatings = [...new Set(props.ratings)].sort()

  return (
    <table>
      <tr>
        <td>Change</td>
        <td>New Rating</td>
        <td>Diff</td>
      </tr>
      {uniqueRatings.map((r) => {
        const newRating = RMath.rating(
          ratings_change(props.ratings, r, props.fn(r))
        );
        return (
          <tr>
            <td>
              {r} &#8594; {props.fn(r)}
            </td>
            <td>{UI.round(newRating)}</td>
            <td>{UI.round(newRating - props.baseRating)}</td>
          </tr>
        );
      })}
    </table>
  );
}

export default Rating;
