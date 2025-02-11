import { useState, useEffect, useRef } from "react";
import { Howl } from "howler";
import { boards } from "./data/board";
import BoardCard from "./BoardCard";

const RandomBoardSelector = () => {
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const letsGoSoundRef = useRef(null);
  const mixSoundRef = useRef(null);
  const jamboreeThemeRef = useRef(null);

  useEffect(() => {
    letsGoSoundRef.current = new Howl({
      src: ["/assets/letsgo.mp3"],
      volume: 1.0,
      autoplay: false,
      html5: true,
    });

    mixSoundRef.current = new Howl({
      src: ["/assets/mixSound.mp3"],
      volume: 1.0,
      autoplay: false,
      html5: true,
    });

    jamboreeThemeRef.current = new Howl({
      src: ["/assets/jamboree-theme.mp3"],
      volume: 0.5,
      loop: true,
      autoplay: false,
      html5: true,
    });

    return () => {
      if (letsGoSoundRef.current) letsGoSoundRef.current.unload();
      if (mixSoundRef.current) mixSoundRef.current.unload();
      if (jamboreeThemeRef.current) jamboreeThemeRef.current.unload();
    };
  }, []);

  const handleSelectRandomBoard = () => {
    const randomIndex = Math.floor(Math.random() * boards.length);
    setSelectedBoard(boards[randomIndex]);

    if (jamboreeThemeRef.current) {
      jamboreeThemeRef.current.stop();
      jamboreeThemeRef.current.play();
    }

    setIsPlaying(false);
  };

  const handleButtonClick = () => {
    if (isPlaying) return;

    setIsPlaying(true);

    if (jamboreeThemeRef.current) {
      jamboreeThemeRef.current.stop();
    }

    if (letsGoSoundRef.current) {
      letsGoSoundRef.current.stop();
      letsGoSoundRef.current.play();
    }

    if (mixSoundRef.current) {
      mixSoundRef.current.stop();
      mixSoundRef.current.play();

      mixSoundRef.current.on("end", () => {
        handleSelectRandomBoard();
      });
    }
  };

  return (
    <div
      className="random-board-container"
      style={{
        backgroundImage: selectedBoard ? "none" : "url('/assets/jamboree.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {selectedBoard ? (
        <BoardCard board={selectedBoard} onSelectRandom={handleButtonClick} />
      ) : (
        <button
          onClick={handleButtonClick}
          className="random-button"
          aria-label="Choose a Random Board"
          disabled={isPlaying}
        >
          Choose a Random Board
        </button>
      )}
    </div>
  );
};

export default RandomBoardSelector;
