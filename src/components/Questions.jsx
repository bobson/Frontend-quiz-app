import "./Questions.css";
import { useState } from "react";
import Results from "./Results";

const Questions = ({ subject, resetGame }) => {
  const [count, setCount] = useState(8);
  const [score, setScore] = useState(0);
  const [errorMsg, setErrorMsg] = useState(false);
  const [answer, setAnswer] = useState(null);
  const [submited, setSubmited] = useState(0);
  const [end, setEnd] = useState(false);

  const questionsLength = subject.questions.length;
  const correctAnswer = subject.questions[count].answer;
  const correctIndex = subject.questions[count].options.indexOf(correctAnswer);

  function handlleSubmit() {
    if (!answer) {
      setErrorMsg(true);
      return;
    }
    if (end === true) setEnd(false);
    if (submited == 0) {
      setErrorMsg(false);
      setSubmited(1);
      if (count + 1 == questionsLength) {
        if (correctAnswer == answer) {
          setScore((prev) => prev + 1);
        }
        setAnswer(null);
        setSubmited(0);
        setCount(0);
        setEnd(true);
      }
    }
    if (submited == 1) {
      if (correctAnswer == answer) {
        setScore((prev) => prev + 1);
      }
      setCount(count + 1);
      setAnswer(null);
      setSubmited(0);
    }
  }

  function renderImg(opt, isCorrect) {
    if (isCorrect) {
      return (
        <img
          className="option-icon"
          src="/Frontend-quiz-app/assets/images/icon-correct.svg"
          alt=""
        />
      );
    } else if (!isCorrect && opt == answer) {
      return (
        <img
          className="option-icon"
          src="/Frontend-quiz-app/assets/images/icon-incorrect.svg"
          alt=""
        />
      );
    }
  }

  if (!subject) return null;
  if (end)
    return <Results subject={subject} score={score} resetGame={resetGame} />;

  return (
    <>
      <div className="question-title">
        <span className="italic">
          Question {count + 1} of {questionsLength}
        </span>
        <h2>{subject.questions[count].question}</h2>
        <div className="length-slider-wrapper">
          <span
            className="length-slider"
            style={{
              "--percentage": `${((count + 1) / questionsLength) * 100}%`,
            }}
          />
        </div>
      </div>
      <div className="questions" role="listbox" aria-label="question options">
        {subject.questions[count].options.map((option, index) => {
          const isCorrect = correctIndex == index;

          return (
            <button
              key={index}
              className="option"
              role="option"
              aria-selected={answer == option ? true : false}
              onClick={() => {
                setAnswer(option);
                setErrorMsg(false);
              }}
              disabled={submited != 0}
              style={
                submited != 0 && answer == option
                  ? {
                      borderColor: isCorrect
                        ? "var(--color-CSS)"
                        : "var(--color-red-500)",
                    }
                  : {}
              }
            >
              <span
                className="question-icon"
                style={
                  submited != 0 && answer == option
                    ? {
                        backgroundColor: isCorrect
                          ? "var(--color-CSS)"
                          : "var(--color-red-500)",
                      }
                    : {}
                }
              >
                {String.fromCharCode(65 + index)}
              </span>
              {option}
              {submited != 0 && renderImg(option, isCorrect)}
            </button>
          );
        })}
      </div>
      <div className="submit">
        <button className="submit-btn" onClick={() => handlleSubmit()}>
          {submited === 0 ? "Submit Answer" : "Nexr Question"}
        </button>
        {errorMsg && (
          <span className="error-message">
            <img
              src="/Frontend-quiz-app/assets/images/icon-incorrect.svg"
              alt=""
            />
            Please select an answer
          </span>
        )}
      </div>
    </>
  );
};

export default Questions;
