import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import PropTypes from "prop-types";

const BoardCard = ({ board, onSelectRandom }) => {
  const boardContainerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      boardContainerRef.current,
      { opacity: 0, scale: 0.8, rotationY: -180 },
      { opacity: 1, scale: 1, rotationY: 0, duration: 0.8, ease: "power2.out" }
    );
  }, [board]);

  if (!board) return null;

  return (
    <div className="board-fullscreen" ref={boardContainerRef}>
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
          onClick={onSelectRandom}
          className="random-button"
          aria-label="Choose a Random Board"
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
    boardView: PropTypes.string.isRequired,
  }).isRequired,
  onSelectRandom: PropTypes.func.isRequired,
};

export default BoardCard;
