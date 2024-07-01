import axios from "axios";
import { useEffect, useState } from "react";

import "../style/quizz.css";
import avatar from "../assets/images/avatar.png";
import atout from "../assets/images/atout.png";
import Question from "./Question";
import ClickEffect from "./ClickEffect";

function Quizz() {
  const [data, setData] = useState([]);
  const [points, setPoints] = useState(0);

  const countryData = () => {
    // Send the request
    axios
      .get(
        "https://restcountries.com/v3.1/region/europe?fields=flags,name,cca3"
      )
      // Use this data to update the state
      .then((response) => {
        // console.info(response.data);
        setData(response.data);
      });
  };

  const dataName = data.map((d) => d.name.common);
  const dataFlags = data.map((d) => d.flags.svg);
  const goodAnswer = dataName[0];
  console.info(dataName);
  useEffect(() => {
    countryData();
  }, []);

  console.info(dataFlags);
  return (
    <>
      <header className="header">
        <img src={avatar} alt="avatar de profil" />
        <button type="button">{points} pts</button>
      </header>
      <Question dataFlags={dataFlags} goodAnswer={goodAnswer} />
      <ClickEffect
        dataName={dataName}
        goodAnswer={goodAnswer}
        setPoints={setPoints}
        points={points}
      />
      <footer className="footer">
        <img src={atout} alt="utilisation d'un atout pour le quizz" />
      </footer>
    </>
  );
}

export default Quizz;
