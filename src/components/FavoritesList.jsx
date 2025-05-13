import { useEffect, useRef } from "react";
import { boards } from "../data/board";
import { gsap } from "gsap";

const FavoritesList = ({ favorites, onSelectBoard, onClose }) => {
  const panelRef = useRef(null);
  useEffect(() => {
    if (panelRef.current) {
      gsap.fromTo(
        panelRef.current,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" }
      );
    }
  }, []);
  return (
    <div className="favorites-overlay">
      <div className="favorites-panel" ref={panelRef}>
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        <h2>Mes Plateaux Favoris</h2>
        {favorites.length === 0 ? (
          <p className="no-favorites">Aucun favori pour le moment</p>
        ) : (
          <div className="favorites-grid">
            {favorites.map((boardId) => {
              const board = boards.find((b) => b.id === boardId);
              if (!board) return null;
              return (
                <div
                  key={boardId}
                  className="favorite-item"
                  onClick={() => onSelectBoard(board)}
                >
                  <img
                    src={board.icon}
                    alt={board.name}
                    className="favorite-icon"
                  />
                  <span>{board.name}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesList;
