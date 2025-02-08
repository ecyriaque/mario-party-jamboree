import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import PropTypes from "prop-types";

const BoardCard = ({ board, onSelectRandom }) => {
  const boardContainerRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      boardContainerRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" }
    );

    gsap.fromTo(
      buttonRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", delay: 0.5 }
    );
  }, [board]);

  if (!board) return null;

  return (
    <div className="board-fullscreen" ref={boardContainerRef}>
      {/* Image de fond qui couvre tout l'écran */}
      <div
        className="board-background"
        style={{ backgroundImage: `url(${board.boardView})` }}
      />

      <div className="board-content">
        <div className="board-info">
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
          className="random-button"
        >
          Choose a Random Board
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
    icon: PropTypes.string.isRequired,
    boardView: PropTypes.string.isRequired,
  }).isRequired,
  onSelectRandom: PropTypes.func.isRequired,
};

export default BoardCard;
