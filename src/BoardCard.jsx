import PropTypes from "prop-types";

const BoardCard = ({ board }) => {
  if (!board) return null;

  return (
    <div className="board-card">
      <img src={board.icon} alt={`${board.name} icon`} className="board-icon" />
      <h2>{board.name}</h2>
      <p>{board.description}</p>
      <img
        src={board.boardView}
        alt={board.name}
        className="board-view-image"
      />
    </div>
  );
};

// Validation des props avec PropTypes
BoardCard.propTypes = {
  board: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    boardView: PropTypes.string.isRequired,
  }).isRequired,
};

export default BoardCard;
