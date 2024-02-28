import React, { useState, useEffect } from "react";
import Roulette from "./Roulette";
import "./ArcadeComponent.scss"; // Importez le fichier CSS
import retour from "./assets/back.png";
import homeMusic from "./assets/home.mp3"; // Importez le fichier MP3

const ArcadeComponent = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isWheelVisible, setIsWheelVisible] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false); // Définissez l'état initial de la musique à false

  useEffect(() => {
    const audioElement = new Audio(homeMusic);

    if (!isFullScreen && !isMusicPlaying) {
      audioElement.play();
    } else {
      audioElement.pause();
      audioElement.currentTime = 0;
    }

    return () => {
      audioElement.pause();
      audioElement.currentTime = 0;
    };
  }, [isFullScreen, isMusicPlaying]);

  const handleScreenClick = () => {
    if (!isWheelVisible) {
      setIsWheelVisible(true);
      setIsFullScreen(!isFullScreen);
    }
  };

  const handleZoomOut = () => {
    setIsWheelVisible(false);
    setIsFullScreen(false);
    setIsMusicPlaying(false);
  };

  const screenClasses = `screen${isFullScreen ? " zoomed-full-screen" : ""}`;

  return (
    <div className="container">
      <div className="arcade-machine">
        <div className="shadow"></div>
        <div className="top">
          <div className="stripes"></div>
        </div>
        <div
          className={`screen-container ${screenClasses}`}
          onClick={handleScreenClick}
        >
          <div className="shadow"></div>
          <div className="screen">
            {isFullScreen && (
              <button className="zoom-out-button" onClick={handleZoomOut}>
                <img src={retour} alt="Retour" />
              </button>
            )}
            {isFullScreen ? (
              <div className="minimized-roulette">
                {isWheelVisible && <Roulette />}
              </div>
            ) : (
              <>
                <div className="screen-display"></div>
                <h2>READY PLAYER ONE</h2>
                <div className="alien-container">
                  <div className="alien">
                    <div className="ear ear-left"></div>
                    <div className="ear ear-right"></div>
                    <div className="head-top"></div>
                    <div className="head">
                      <div className="eye eye-left"></div>
                      <div className="eye eye-right"></div>
                    </div>
                    <div className="body"></div>
                    <div className="arm arm-left"></div>
                    <div className="arm arm-right"></div>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="joystick">
            <div className="stick"></div>
          </div>
        </div>
        <div className="board">
          <div className="button button-a"></div>
          <div className="button button-b"></div>
          <div className="button button-c"></div>
        </div>
        <div className="bottom">
          <div className="stripes"></div>
        </div>
      </div>
      <footer>
        <h3>Arcade Cabinet made with love</h3>
      </footer>
    </div>
  );
};

export default ArcadeComponent;
