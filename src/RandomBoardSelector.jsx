import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import BoardCard from "./BoardCard";
import BoardCarousel from "./BoardCarousel";
import Particles from "./components/Particles";
import Loader from "./components/Loader";
import FavoritesList from "./components/FavoritesList";
import useFavorites from "./hooks/useFavorites";
import useAudio from "./hooks/useAudio";
import useConfetti from "./hooks/useConfetti";
import { boards } from "./data/board";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WelcomeScreen from "./components/WelcomeScreen";
import MarioScene from "./PlayerController";

const RandomBoardSelector = () => {
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const containerRef = useRef(null);
  const buttonRef = useRef(null);
  const logoBackgroundRef = useRef(null);

  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const { letsGoSoundRef, mixSoundRef, jamboreeThemeRef } = useAudio(isMuted);
  const { startConfettiShower, stopConfettiShower } = useConfetti();

  useEffect(() => {
    gsap.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: "power3.out" }
    );

    if (buttonRef.current) {
      gsap.fromTo(
        buttonRef.current,
        { scale: 0.7, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          delay: 0.7,
          ease: "back.out(1.7)",
        }
      );
    }

    if (logoBackgroundRef.current) {
      gsap.fromTo(
        logoBackgroundRef.current,
        { opacity: 0, scale: 1.1 },
        { opacity: 1, scale: 1, duration: 1.5, ease: "power2.out" }
      );
    }

    return () => {
      letsGoSoundRef.current?.unload();
      mixSoundRef.current?.unload();
      jamboreeThemeRef.current?.unload();
    };
  }, [isMuted]);

  useEffect(() => {
    localStorage.setItem("boardFavorites", JSON.stringify(favorites));
  }, [favorites]);

  const handleSelectRandomBoard = () => {
    setLoading(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * boards.length);
      setSelectedBoard(boards[randomIndex]);

      startConfettiShower();

      jamboreeThemeRef.current?.fade(0, 0.5, 1000);
      setTimeout(() => {
        jamboreeThemeRef.current?.play();
      }, 1000);
      setIsPlaying(false);
      setIsScrolling(false);
      setLoading(false);
    }, 800);
  };

  const handleSelectBoard = (board) => {
    setSelectedBoard(board);
    setShowFavorites(false);
    setIsScrolling(false);
    setIsPlaying(false);

    // Effet de transition lors de la sélection d'un favori
    gsap.fromTo(
      containerRef.current,
      { opacity: 0.7 },
      { opacity: 1, duration: 0.7, ease: "power2.inOut" }
    );
  };

  const handleButtonClick = () => {
    if (isPlaying) return;
    setIsPlaying(true);
    stopConfettiShower();

    gsap.to(buttonRef.current, {
      scale: 1.2,
      opacity: 0,
      duration: 0.5,
      ease: "back.in(1.7)",
      onComplete: () => {
        setIsScrolling(true);
        jamboreeThemeRef.current?.stop();
        letsGoSoundRef.current?.stop();
        letsGoSoundRef.current?.play();
        mixSoundRef.current?.stop();
        mixSoundRef.current?.play();
        setTimeout(() => {
          handleSelectRandomBoard();
        }, 5000);
      },
    });

    if (logoBackgroundRef.current) {
      gsap.to(logoBackgroundRef.current, {
        opacity: 0,
        scale: 1.2,
        duration: 0.5,
        ease: "power2.in",
      });
    }
  };

  const handleMuteToggle = () => {
    setIsMuted((prev) => !prev);

    if (letsGoSoundRef.current)
      letsGoSoundRef.current.volume(isMuted ? 1.0 : 0);
    if (mixSoundRef.current) mixSoundRef.current.volume(isMuted ? 1.0 : 0);
    if (jamboreeThemeRef.current) {
      jamboreeThemeRef.current.volume(isMuted ? 0.5 : 0);

      if (isMuted && !jamboreeThemeRef.current.playing()) {
        jamboreeThemeRef.current.play();
      } else if (!isMuted) {
        jamboreeThemeRef.current.pause();
      }
    }
  };

  const handleToggleFavorite = (boardId) => {
    toggleFavorite(boardId);
    if (isFavorite(boardId)) {
      toast.success("Plateau retiré des favoris !", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          background: "#ffcc00",
          color: "#333",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(255, 204, 0, 0.5)",
        },
      });
    } else {
      toast.success("Plateau ajouté aux favoris !", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          background: "#ffcc00",
          color: "#333",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(255, 204, 0, 0.5)",
        },
      });
    }
  };

  return (
    <div className="random-board-container fullscreen" ref={containerRef}>
      <Particles />

      <button
        onClick={handleMuteToggle}
        className="control-button mute-button"
        aria-label={isMuted ? "Activer le son" : "Couper le son"}
      >
        {isMuted ? "🔊" : "🔇"}
      </button>

      <div className="app-controls">
        <button
          onClick={() => setShowFavorites(true)}
          className="control-button favorites-button"
          aria-label="Afficher mes favoris"
        >
          ⭐
        </button>
      </div>

      {showFavorites && (
        <FavoritesList
          favorites={favorites}
          onSelectBoard={handleSelectBoard}
          onClose={() => setShowFavorites(false)}
        />
      )}

      {isScrolling ? (
        <BoardCarousel onFinish={handleSelectRandomBoard} />
      ) : selectedBoard ? (
        <>
          <BoardCard board={selectedBoard} onSelectRandom={handleButtonClick} />
          <button
            onClick={() => handleToggleFavorite(selectedBoard.id)}
            className={`favorite-toggle ${
              isFavorite(selectedBoard.id) ? "is-favorite" : ""
            }`}
            aria-label={
              isFavorite(selectedBoard.id)
                ? "Retirer des favoris"
                : "Ajouter aux favoris"
            }
          >
            {isFavorite(selectedBoard.id) ? "★" : "☆"}
          </button>
        </>
      ) : (
        <div className="welcome-screen">
          <Particles />
          <div className="welcome-content-blur">
            <div className="logo-container" ref={logoBackgroundRef}>
              <img
                src="/assets/jamboree-logo.png"
                alt="Mario Party Jamboree Logo"
                className="welcome-logo"
              />
            </div>
            <button
              ref={buttonRef}
              onClick={handleButtonClick}
              className="random-button pulse-animation"
              aria-label="Choisir un plateaux aléatoire"
              disabled={isPlaying}
              tabIndex={0}
            >
              Choisir un plateau aléatoire
            </button>
          </div>
        </div>
      )}

      <MarioScene
        height="150px"
        bottom="0"
        walkBounds={{ min: -10, max: 10 }}
        walkSpeed={2}
        useSimpleModel={true}
      />
      <ToastContainer />
    </div>
  );
};

export default RandomBoardSelector;
