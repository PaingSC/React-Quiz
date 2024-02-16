import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishedScreen from "./FinishedScreen";

const initialState = {
  questions: [],
  //status: "loading", "error", "ready", "active", "finished"
  status: "loading",
  currentIndex: 0,
  answer: null,
  points: 0,
  highscore: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };

    case "dataFailed":
      return {
        ...state,
        status: "error",
      };

    case "start":
      return {
        ...state,
        status: "active",
      };

    case "newAnswer":
      const question = state.questions.at(state.currentIndex);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };

    case "nextQuestion":
      return {
        ...state,
        currentIndex: state.currentIndex + 1,
        answer: null,
      };

    case "finished":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };

    case "restart":
      return {
        ...initialState,
        status: "ready",
        highscore: state.highscore,
        questions: state.questions,
      };

    default:
      throw new Error("Action Unknow");
  }
}

export default function App() {
  const [
    { questions, status, currentIndex, answer, points, highscore },
    dispatch,
  ] = useReducer(reducer, initialState);

  console.log({ questions, status, currentIndex, answer, points });

  const numQuestion = questions.length;
  const maxPossibleValue = questions.reduce((acc, cur) => acc + cur.points, 0);

  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestion={numQuestion} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              currentIndex={currentIndex}
              numQuestion={numQuestion}
              points={points}
              maxPossibleValue={maxPossibleValue}
              answer={answer}
            />
            <Question
              question={questions[currentIndex]}
              dispatch={dispatch}
              answer={answer}
              currentIndex={currentIndex}
            />
            <NextButton
              dispatch={dispatch}
              answer={answer}
              currentIndex={currentIndex}
              numQuestion={numQuestion}
            />
          </>
        )}
        {status === "finished" && (
          <FinishedScreen
            points={points}
            maxPosiblePoints={maxPossibleValue}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
