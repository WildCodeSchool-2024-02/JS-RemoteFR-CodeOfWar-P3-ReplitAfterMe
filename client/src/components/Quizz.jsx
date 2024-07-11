import { useState, useEffect, useCallback } from "react";
import { useLoaderData, Link } from "react-router-dom";

import "../style/quizz.css";
import avatar from "../assets/images/avatar.png";
import Question from "./Question";
import Atout from "./Atout";
import atouts from "../data/atout";

import AnswerButton from "./AnswerButton";

import PopUp from "./PopUp";

function Quizz() {
  const [points, setPoints] = useState(0);
  const [answerArray, setAnswerArray] = useState([]);
  const [goodAnswer, setGoodAnswer] = useState(null);
  const [numQuestion, setNumQuestion] = useState(0);
  const [bonus, setBonus] = useState(0);

  const maxQuestions = 10;

  const data = useLoaderData();
  const [popUP, setPopUp] = useState(false);

  const togglePopup = () => {
    setPopUp(!popUP);
  };

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
    setQuestion();
  }, [setQuestion]);

  const setArray = () => {
    const reduceAnswerArray = [];
    let secondAnswer;
    do {
      secondAnswer =
        answerArray[Math.floor(Math.random() * answerArray.length)];
    } while (secondAnswer === goodAnswer);
    reduceAnswerArray.push(goodAnswer, secondAnswer);
    setAnswerArray(reduceAnswerArray);
  };

  // --- ATOUT PROBA en construction ---//
  const [randomAnswer, setRandomAnswer] = useState(null);

  const call = (threshold = 0.75) => {
    const random = Math.random() < threshold;
    return setRandomAnswer(random);
  };

  console.info(randomAnswer);
  // --- ATOUT PROBA en construction---//

  console.info(answerArray);

  if (numQuestion >= maxQuestions) {
    return (
      <div>
        Vous avez obtenu : {points} points
        <Link to="/story">
          <button type="button">Histoire</button>
        </Link>
      </div>
    );
  }

  if (!goodAnswer) {
    return "";
  }

  return (
    <main className="quizz-container">
      <header className="header">
        <div aria-hidden="true" onClick={togglePopup}>
          <img src={avatar} alt="avatar de profil" />
        </div>
        <button type="button">{points} pts</button>
      </header>

      <Question
        dataFlags={goodAnswer.flags.svg}
        dataAlt={goodAnswer.flags.alt}
        numQuestion={numQuestion}
        maxQuestions={maxQuestions}
      />
      <div className="answer-div">
        {answerArray.map((country) => (
          <AnswerButton
            key={country.name.common}
            dataName={country.name.common}
            goodAnswer={goodAnswer.name.common}
            setPoints={setPoints}
            points={points}
            setQuestion={setQuestion}
            setNumQuestion={setNumQuestion}
            numQuestion={numQuestion}
            bonus={bonus}
            setBonus={setBonus}
            call={call}
          />
        ))}
      </div>
      {popUP && <PopUp handleClose={togglePopup} />}
      <footer className="footer">
        {atouts.map((atout) => (
          <Atout
            key={atout.name}
            name={atout.name}
            image={atout.img.src}
            imageAlt={atout.img.alt}
            fonction={atout.function}
            // props
            bonus={bonus}
            setBonus={setBonus}
            setQuestion={setQuestion}
            setArray={setArray}
            call={call}
          />
        ))}
      </footer>
    </main>
  );
}
export default Quizz;
