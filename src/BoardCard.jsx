// BoardCard.jsx (amélioré)
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import PropTypes from "prop-types";

const BoardCard = ({ board, onSelectRandom }) => {
  const boardContainerRef = useRef(null);
  const boardInfoRef = useRef(null);
  const buttonRef = useRef(null);
  const bgRef = useRef(null);

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
        { y: 50, opacity: 0 },
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

  if (!board) return null;

  return (
    <div className="board-fullscreen" ref={boardContainerRef}>
      <div
        className="board-background"
        style={{ backgroundImage: `url(${board.boardView})` }}
        aria-hidden="true"
        ref={bgRef}
      />
      <div className="board-content">
        <div className="board-info" ref={boardInfoRef}>
          <img
            src={board.icon}
            alt={`${board.name} icon`}
            className="board-icon"
          />
          <h1>{board.name}</h1>
          <p>{board.description}</p>
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
