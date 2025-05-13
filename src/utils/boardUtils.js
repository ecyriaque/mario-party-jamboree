export const getDifficultyStars = (boardId) => {
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

export const getBoardType = (boardId) => {
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
