import Options from "./Options";

function Question({ question, dispatch, answer, currentIndex }) {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options
        question={question}
        dispatch={dispatch}
        answer={answer}
        currentIndex={currentIndex}
      />
    </div>
  );
}

export default Question;
