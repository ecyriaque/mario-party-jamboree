import { useState } from "react";
import { boards } from "./data/board";
import BoardCard from "./BoardCard";

const RandomBoardSelector = () => {
  const [selectedBoard, setSelectedBoard] = useState(null);

  const handleSelectRandomBoard = () => {
    const randomIndex = Math.floor(Math.random() * boards.length);
    setSelectedBoard(boards[randomIndex]);
  };

  return (
    <div className="random-board-selector">
      <button onClick={handleSelectRandomBoard} className="random-button">
        Choose a Random Board
      </button>
      {selectedBoard && <BoardCard board={selectedBoard} />}
    </div>
  );
};

export default RandomBoardSelector;
