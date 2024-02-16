function FinishedScreen({ points, maxPosiblePoints, highscore }) {
  const percentage = (points / maxPosiblePoints) * 100;

  let emoji;
  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🎉";
  if (percentage >= 50 && percentage < 80) emoji = "🙃";
  if (percentage > 0 && percentage < 50) emoji = "🤔";
  if (percentage === 0) emoji = "🤦";

  return (
    <>
      <p className="result">
        {emoji}You scored <strong>{points}</strong> Out of {maxPosiblePoints} (
        {Math.ceil(percentage)}%)
      </p>
      <p className="highscore">(Highscore: {highscore} points)</p>
    </>
  );
}

export default FinishedScreen;
