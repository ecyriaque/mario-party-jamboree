import { useState, useEffect, useRef } from "react";
import { Howl } from "howler";
import { boards } from "./data/board";
import BoardCard from "./BoardCard";
import BoardCarousel from "./BoardCarousel";

const RandomBoardSelector = () => {
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
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
      letsGoSoundRef.current?.unload();
      mixSoundRef.current?.unload();
      jamboreeThemeRef.current?.unload();
    };
  }, []);

  const handleSelectRandomBoard = () => {
    const randomIndex = Math.floor(Math.random() * boards.length);
    setSelectedBoard(boards[randomIndex]);

    // Jouer la musique finale
    jamboreeThemeRef.current?.stop();
    jamboreeThemeRef.current?.play();

    setIsPlaying(false);
    setIsScrolling(false);
  };

  const handleButtonClick = () => {
    if (isPlaying) return;

    setIsPlaying(true);
    setIsScrolling(true);

    jamboreeThemeRef.current?.stop();
    letsGoSoundRef.current?.stop();
    letsGoSoundRef.current?.play();
    mixSoundRef.current?.stop();
    mixSoundRef.current?.play();

    setTimeout(() => {
      handleSelectRandomBoard();
    }, 5000); // Délai avant l'arrêt du défilement
  };

  return (
    <div className="random-board-container fullscreen">
      {isScrolling ? (
        <BoardCarousel onFinish={handleSelectRandomBoard} />
      ) : selectedBoard ? (
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
