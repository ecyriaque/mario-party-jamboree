import { useState, useEffect } from "react";

export default function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("boardFavorites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("boardFavorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (boardId) => {
    setFavorites((prev) =>
      prev.includes(boardId)
        ? prev.filter((id) => id !== boardId)
        : [...prev, boardId]
    );
  };

  const isFavorite = (boardId) => favorites.includes(boardId);

  return { favorites, toggleFavorite, isFavorite };
}
