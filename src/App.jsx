import { useEffect, useState } from "react";

import "./App.css";
import Questions from "./components/Questions";

function App() {
  const [theme, setTheme] = useState("light");
  const [subject, setSubject] = useState(null);
  const [data, setData] = useState(null);
  const [isHovered, setIsHovered] = useState(null);
  const [results, setResults] = useState(0);

  useEffect(() => {
    async function getData() {
      const res = await fetch("/data.json");

      const json = await res.json();

      setData(json.quizzes);
    }
    getData();
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  function switchTheme() {
    setTheme(theme == "dark" ? "light" : "dark");
  }

  function resetGame() {
    setSubject(null);
  }

  console.log(results);

  if (!data) return <div>Loading...</div>;

  return (
    <>
      <div className="app">
        <picture className="bg-image">
          <source
            media="(min-width: 1200px)"
            srcSet={`/assets/images/pattern-background-desktop-${theme}.svg`}
          />
          <source
            media="(min-width: 768px)"
            srcSet={`/assets/images/pattern-background-tablet-${theme}.svg`}
          />
          <img
            src={`/assets/images/pattern-background-mobile-${theme}.svg`}
            alt=""
          />
        </picture>
        <nav className="main-navigation">
          {subject ? (
            <div
              className="nav-display"
              aria-live="polite"
              aria-atomic="true"
              role="status"
            >
              <img
                src={subject?.icon}
                style={{ backgroundColor: `var(--color-${subject.title}-bg)` }}
                alt=""
              />
              <span className="topic-name">{subject?.title}</span>
            </div>
          ) : null}
          <div className="nav-action">
            <img
              src={`/assets/images/icon-sun-${theme == "dark" ? "light" : "dark"}.svg`}
              alt=""
            />
            <button
              className="theme-toggle-btn"
              aria-label="Switch theme"
              type="button"
              onClick={switchTheme}
            >
              <span
                style={{
                  transform:
                    theme == "dark" ? "translateX(100%)" : "translateX(0)",
                }}
              ></span>
            </button>
            <img
              src={`/assets/images/icon-moon-${theme == "dark" ? "light" : "dark"}.svg`}
              alt=""
            />
          </div>
        </nav>
        <main>
          {!subject ? (
            <>
              <div className="app-title">
                <h1>
                  Welcome to the <span>Frontend Quiz!</span>{" "}
                </h1>
                <span className="italic">Pick a subject to get started.</span>
              </div>
              <div role="list" className="subjects">
                {data?.map((quiz, index) => (
                  <button
                    onClick={() => setSubject(quiz)}
                    key={quiz.title}
                    onMouseEnter={() => setIsHovered(index)}
                    onMouseLeave={() => setIsHovered(null)}
                    style={{
                      borderColor:
                        isHovered == index
                          ? `var(--color-${quiz.title})`
                          : "transparent",
                    }}
                  >
                    <img
                      src={quiz.icon}
                      alt=""
                      style={{
                        backgroundColor: `var(--color-${quiz.title}-bg)`,
                      }}
                    />

                    {quiz.title}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <Questions subject={subject} resetGame={resetGame} />
          )}
        </main>
      </div>
    </>
  );
}

export default App;
