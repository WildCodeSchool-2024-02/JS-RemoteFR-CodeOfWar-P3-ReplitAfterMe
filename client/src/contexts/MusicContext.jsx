import { createContext, useState, useContext, useMemo } from "react";
import PropTypes from "prop-types";

import url from "../assets/music/quiz.mp3";

const MusicContext = createContext();

export function MusicProvider({ children }) {
  const [audioM] = useState(new Audio(url));
  const [volume, setVolume] = useState(0);
  const audio = useMemo(
    () => ({ audioM, volume, setVolume }),
    [audioM, volume]
  );

  return (
    <MusicContext.Provider value={audio}>{children}</MusicContext.Provider>
  );
}

export const useMusic = () => useContext(MusicContext);

MusicProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
