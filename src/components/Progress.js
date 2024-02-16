function Progress({
  currentIndex,
  numQuestion,
  points,
  maxPossibleValue,
  answer,
}) {
  return (
    <header className="progress">
      <progress
        max={numQuestion}
        value={currentIndex + Number(answer !== null)}
      />
      <p>
        Question <strong>{currentIndex + 1}</strong> / {numQuestion}
      </p>
      <p>
        <strong>{points}</strong> / {maxPossibleValue}
      </p>
    </header>
  );
}

export default Progress;
