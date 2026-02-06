import "./Results.css";

const Results = ({ subject, score, resetGame }) => {
  return (
    <>
      <h1>
        Quiz completed
        <span> You scored...</span>
      </h1>
      <div className="board">
        <div className="title">
          <img
            src={"/Frontend-quiz-app" + subject.icon}
            alt=""
            style={{
              backgroundColor: `var(--color-${subject.title}-bg)`,
            }}
          />
          <span>{subject.title}</span>
        </div>
        <div className="score">
          <span>{score}</span>
          <span>out of {subject.questions.length}</span>
        </div>
      </div>
      <button className="submit-btn" onClick={resetGame}>
        Play Again
      </button>
    </>
  );
};

export default Results;
