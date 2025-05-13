// BoardCard.jsx (amélioré)
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import PropTypes from "prop-types";

const BoardCard = ({ board, onSelectRandom }) => {
  const boardContainerRef = useRef(null);
  const boardInfoRef = useRef(null);
  const buttonRef = useRef(null);
  const bgRef = useRef(null);
  const iconRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const prefersReduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!prefersReduced && boardContainerRef.current) {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        paused: true,
        delay: 0.2,
      });

      tl.fromTo(
        bgRef.current,
        { opacity: 0, scale: 1.05, filter: "brightness(0.7)" },
        {
          opacity: 1,
          scale: 1,
          filter: "brightness(0.8)",
          duration: 1,
          ease: "power2.out",
        }
      );

      tl.fromTo(
        boardInfoRef.current,
        {
          y: 50,
          opacity: 0,
          rotationX: "2deg",
          transformOrigin: "bottom center",
        },
        {
          y: 0,
          opacity: 1,
          rotationX: "0deg",
          duration: 0.7,
          ease: "back.out(1.4)",
        },
        "-=0.6"
      );
      // Bouton qui apparaît avec un rebond plus naturel
      tl.fromTo(
        buttonRef.current,
        { scale: 0.8, opacity: 0, y: "10px" },
        {
          scale: 1,
          opacity: 1,
          y: "0px",
          duration: 0.5,
          ease: "back.out(1.5)",
        },
        "-=0.3"
      );

      tl.fromTo(
        iconRef.current,
        { scale: 0.85, rotation: -5, opacity: 0.8 },
        {
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 0.5,
          ease: "back.out(1.5)",
        },
        "-=0.3"
      );

      const titleElement = boardInfoRef.current.querySelector("h1");
      const descElement =
        boardInfoRef.current.querySelector(".board-description");
      const detailsElement = boardInfoRef.current.querySelector(
        ".board-info-details"
      );

      if (titleElement) {
        tl.fromTo(
          titleElement,
          { opacity: 0.6, y: "-10px" },
          { opacity: 1, y: "0px", duration: 0.4 },
          "-=0.3"
        );
      }

      if (descElement) {
        tl.fromTo(
          descElement,
          { opacity: 0.6, y: "5px" },
          { opacity: 1, y: "0px", duration: 0.4 },
          "-=0.2"
        );
      }

      if (detailsElement) {
        tl.fromTo(
          detailsElement,
          { opacity: 0, y: "10px" },
          { opacity: 1, y: "0px", duration: 0.5 },
          "-=0.1"
        );
      }

      tl.play();
    }
  }, [board]);

  const handleBgHover = () => {
    if (bgRef.current) {
      setIsHovering(true);
      gsap.to(bgRef.current, {
        filter: "brightness(0.9) contrast(1.1) saturate(1.1)",
        scale: 1.02,
        duration: 0.4,
        ease: "power2.out",
      });
    }
  };

  const handleBgLeave = () => {
    if (bgRef.current) {
      setIsHovering(false);
      gsap.to(bgRef.current, {
        filter: "brightness(0.8) contrast(1.05) saturate(1)",
        scale: 1,
        duration: 0.4,
        ease: "power2.out",
      });
    }
  };

  const handleIconClick = () => {
    if (iconRef.current) {
      const tl = gsap.timeline();

      tl.to(iconRef.current, {
        rotation: "+=20",
        scale: 1.1,
        duration: 0.2,
        ease: "power1.inOut",
      }).to(iconRef.current, {
        rotation: "+=340",
        scale: 1,
        duration: 0.8,
        ease: "power2.inOut",
      });
    }
  };

  const handleButtonHover = () => {
    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        scale: 1.05,
        boxShadow:
          "0 10px 25px rgba(0, 0, 0, 0.3), 0 0 12px rgba(255, 204, 0, 0.5)",
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const handleButtonLeave = () => {
    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        scale: 1,
        boxShadow:
          "0 5px 15px rgba(0, 0, 0, 0.3), 0 0 8px rgba(255, 204, 0, 0.3)",
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const handleButtonClick = () => {
    // Animation du clic pour feedback visuel
    if (buttonRef.current) {
      const tl = gsap.timeline();

      tl.to(buttonRef.current, {
        scale: 0.95,
        duration: 0.1,
        ease: "power2.in",
      }).to(buttonRef.current, {
        scale: 1,
        duration: 0.2,
        ease: "back.out(3)",
      });
    }

    // Délai très court pour que l'animation soit visible avant la transition
    setTimeout(() => {
      onSelectRandom();
    }, 120);
  };

  if (!board) return null;

  return (
    <div className="board-fullscreen" ref={boardContainerRef}>
      <div
        className="board-background"
        style={{ backgroundImage: `url(${board.boardView})` }}
        aria-hidden="true"
        ref={bgRef}
        onMouseEnter={handleBgHover}
        onMouseLeave={handleBgLeave}
      />
      <div className="board-content">
        <div
          className={`board-info ${isHovering ? "board-info-hover" : ""}`}
          ref={boardInfoRef}
        >
          <img
            src={board.icon}
            alt={`${board.name} icon`}
            className="board-icon"
            ref={iconRef}
            onClick={handleIconClick}
          />
          <h1 className="board-title">{board.name}</h1>
          <p className="board-description">{board.description}</p>
          <div className="board-info-details">
            <span className="board-difficulty">
              Difficulté: {getDifficultyStars(board.id)}
            </span>
            <span className="board-type">Type: {getBoardType(board.id)}</span>
          </div>
        </div>
        <button
          ref={buttonRef}
          onClick={handleButtonClick}
          onMouseEnter={handleButtonHover}
          onMouseLeave={handleButtonLeave}
          className="random-button pulse-animation"
          aria-label="Choisir un plateau aléatoire"
        >
          Choisir un autre plateau
        </button>
      </div>
    </div>
  );
};

// Fonctions utilitaires pour les données supplémentaires
const getDifficultyStars = (boardId) => {
  const difficulties = {
    1: "★★☆☆☆",
    2: "★★★☆☆",
    3: "★★★★☆",
    4: "★★★★★",
    5: "★★☆☆☆",
    6: "★★★★☆",
    7: "★★★☆☆",
  };
  return difficulties[boardId] || "★★★☆☆";
};

const getBoardType = (boardId) => {
  const types = {
    1: "Nature",
    2: "Course",
    3: "Plage",
    4: "Château",
    5: "Ville",
    6: "Western",
    7: "Fantaisie",
  };
  return types[boardId] || "Standard";
};

BoardCard.propTypes = {
  board: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    boardView: PropTypes.string.isRequired,
    icon: PropTypes.string,
  }).isRequired,
  onSelectRandom: PropTypes.func.isRequired,
};

export default BoardCard;
