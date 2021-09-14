import RMath from './RMath'

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
        const newRating = RMath.computePreciseRating(
          ratings_change(props.ratings, r, props.fn(r))
        );
        return (
          <tr>
            <td>
              {r} &#8594; {props.fn(r)}
            </td>
            <td>{RMath.round_precision(newRating, 2)}</td>
            <td>{RMath.round_precision(newRating - props.baseRating, 2)}</td>
          </tr>
        );
      })}
    </table>
  );
}

export default Rating;
