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
      // Animation séquentielle avec timeline GSAP
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Fond qui apparaît progressivement
      tl.fromTo(
        bgRef.current,
        { opacity: 0, scale: 1.1 },
        { opacity: 1, scale: 1, duration: 1.2 }
      );

      // Carte d'information qui monte et devient visible
      tl.fromTo(
        boardInfoRef.current,
        { y: 70, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.8"
      );

      // Bouton qui apparaît avec un rebond
      tl.fromTo(
        buttonRef.current,
        { scale: 0.7, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" },
        "-=0.4"
      );

      // Animation spécifique pour l'icône
      tl.fromTo(
        iconRef.current,
        { scale: 0.8, rotation: -10, opacity: 0.7 },
        {
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 0.5,
          ease: "back.out(1.7)",
        },
        "-=0.2"
      );

      // Effet shake léger sur le titre
      setTimeout(() => {
        const titleElement = boardInfoRef.current.querySelector("h1");
        if (titleElement) {
          gsap.fromTo(
            titleElement,
            { rotateZ: -2, scale: 0.95 },
            {
              rotateZ: 2,
              scale: 1.05,
              duration: 0.3,
              repeat: 1,
              yoyo: true,
              ease: "power1.inOut",
              onComplete: () => {
                gsap.to(titleElement, { rotateZ: 0, scale: 1, duration: 0.2 });
              },
            }
          );
        }
      }, 1500);
    }
  }, [board]);

  const handleBgHover = () => {
    if (bgRef.current) {
      setIsHovering(true);
      gsap.to(bgRef.current, {
        filter: "brightness(0.9) contrast(1.2)",
        duration: 0.5,
      });
    }
  };

  const handleBgLeave = () => {
    if (bgRef.current) {
      setIsHovering(false);
      gsap.to(bgRef.current, {
        filter: "brightness(0.8) contrast(1.1)",
        duration: 0.5,
      });
    }
  };

  const handleIconClick = () => {
    if (iconRef.current) {
      gsap.to(iconRef.current, {
        rotation: "+=360",
        duration: 1,
        ease: "power2.inOut",
      });
    }
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
          onClick={onSelectRandom}
          className="random-button pulse-animation"
          aria-label="Choisir un tableau aléatoire"
        >
          Choisir un autre tableau
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
    icon: PropTypes.string, // Ajout de la propriété icon utilisée
  }).isRequired,
  onSelectRandom: PropTypes.func.isRequired,
};

export default BoardCard;
