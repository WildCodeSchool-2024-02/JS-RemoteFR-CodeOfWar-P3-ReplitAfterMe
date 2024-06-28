import { useState } from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import "../style/buttonBlood.css";

export default function AnimationButton({ dataName }) {
  const [showImage, setShowImage] = useState(false);

  const handleClick = () => {
    setShowImage(true);
    setTimeout(() => {
      setShowImage(false);
    }, 1000);
  };

  return (
    <div className="animation-button">
      <button className="button" type="button" onClick={handleClick}>
        {dataName}
      </button>
      {showImage && (
        <motion.img
          className="animation-image"
          src="https://img1.picmix.com/output/stamp/normal/2/8/5/7/877582_dea0b.png"
          alt="Feedback"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.5 }}
        />
      )}
    </div>
  );
}

AnimationButton.propTypes = {
  dataName: PropTypes.arrayOf(PropTypes.string).isRequired,
};
