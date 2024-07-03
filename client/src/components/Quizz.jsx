import { useState, useEffect, useCallback } from "react";
import { useLoaderData, Link } from "react-router-dom";

import "../style/quizz.css";
import avatar from "../assets/images/avatar.png";
import atout from "../assets/images/atout.png";
import Question from "./Question";
import AnimationButton from "./AnimationButton";

function Quizz() {
  const [points, setPoints] = useState(0);
  const [answerArray, setAnswerArray] = useState([]);
  const [goodAnswer, setGoodAnswer] = useState(null);
  const [numQuestion, setNumQuestion] = useState(1);

  const data = useLoaderData();

  const setQuestion = useCallback(() => {
    const nextAnswerArray = [];
    for (let i = 0; i < 4; i += 1) {
      const randomIndex = Math.floor(Math.random() * data.length);
      const selectedItem = data.splice(randomIndex, 1)[0];
      nextAnswerArray.push(selectedItem);
    }
    const nextGoodAnswer =
      nextAnswerArray[Math.floor(Math.random() * nextAnswerArray.length)];
    setAnswerArray(nextAnswerArray);
    setGoodAnswer(nextGoodAnswer);
  }, [data]);

  useEffect(() => {
    if (data.length > 0) {
      setQuestion();
    }
  }, [data, setQuestion]);

  if (numQuestion >= 11) {
    return (
      <div>
        Vous avez obtenu : {points} points
        <Link to="/story">
          <button type="button">Histoire</button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <header className="header">
        <Link to="/">
          <img src={avatar} alt="avatar de profil" />
        </Link>
        <button type="button">{points} pts</button>
      </header>

      <Question
        dataFlags={goodAnswer.flags.svg}
        dataAlt={goodAnswer.flags.alt}
        numQuestion={numQuestion}
      />

      {answerArray.map((country) => (
        <AnimationButton
          key={country.name.common}
          dataName={country.name.common}
          goodAnswer={goodAnswer.name.common}
          setPoints={setPoints}
          points={points}
          setQuestion={setQuestion}
          setNumQuestion={setNumQuestion}
          numQuestion={numQuestion}
        />
      ))}

      <footer className="footer">
        <img src={atout} alt="utilisation d'un atout pour le quizz" />
      </footer>
    </>
  );
}

export default Quizz;
