import React, { useState, useEffect } from "react";
import { Wheel } from "react-custom-roulette";
import "./Roulette.css"; // Importez un fichier CSS séparé pour le style
import spinSound from "./assets/spin.mp3"; // Son pour le spin
import winSound from "./assets/win.mp3"; // Son pour la victoire
import loseSound from "./assets/loose.mp3"; // Son pour la défaite

const Roulette = () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [guessedNumber, setGuessedNumber] = useState("");
  const [resultMessage, setResultMessage] = useState("");
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const spinAudio = new Audio(spinSound);
  const winAudio = new Audio(winSound);
  const loseAudio = new Audio(loseSound);

  useEffect(() => {
    if (showErrorPopup) {
      const timeout = setTimeout(() => {
        setShowErrorPopup(false);
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [showErrorPopup]);

  const handleSpinClick = () => {
    // Réinitialiser le message résultant à une chaîne vide
    setResultMessage("");
    const guessedNumberInt = parseInt(guessedNumber, 10);

    if (
      isNaN(guessedNumberInt) ||
      guessedNumberInt < 1 ||
      guessedNumberInt > 6
    ) {
      // Afficher la pop-up d'erreur
      setShowErrorPopup(true);
      return;
    }

    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * data.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
      spinAudio.play(); // Jouer le son spin.mp3
    }
  };

  const onStopSpinning = () => {
    setMustSpin(false);

    const guessedNumberInt = parseInt(guessedNumber, 10);

    if (
      isNaN(guessedNumberInt) ||
      guessedNumberInt < 1 ||
      guessedNumberInt > 6
    ) {
      setResultMessage("Please enter a valid number between 1 and 6.");
      return;
    }

    const resultNumber = parseInt(data[prizeNumber].option, 10);

    if (guessedNumberInt === resultNumber) {
      setResultMessage("Congratulations, you've won! 🎉");
      winAudio.play(); // Jouer le son de victoire
    } else {
      setResultMessage("Sorry, you've lost. 😞");
      loseAudio.play(); // Jouer le son de défaite
    }
  };

  const data = [
    { option: "1", style: { backgroundColor: "#FF595E" } },
    { option: "2", style: { backgroundColor: "#FFCA3A" } },
    { option: "3", style: { backgroundColor: "#8AC926" } },
    { option: "4", style: { backgroundColor: "#1982C4" } },
    { option: "5", style: { backgroundColor: "#6A4C93" } },
    { option: "6", style: { backgroundColor: "#FF595E" } },
  ];

  return (
    <>
      <div className="minimized-roulette">
        {showErrorPopup && (
          <div className="error-popup">Veuillez saisir un nombre valide</div>
        )}
        <div className="result-message">
          {resultMessage && <p>{resultMessage}</p>}
        </div>
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={data}
          onStopSpinning={onStopSpinning}
        />
        <div className="input-container">
          <label>Enter a number between 1 and 6:</label>
          <input
            type="number"
            value={guessedNumber}
            onChange={(e) => setGuessedNumber(e.target.value)}
            min="1"
            max="6"
          />
          <button onClick={handleSpinClick} className="spin-button">
            SPIN
          </button>
        </div>
      </div>
    </>
  );
};

export default Roulette;
