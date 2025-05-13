const icons = import.meta.glob("../assets/board-icons/*.png", { eager: true });
const boardViews = import.meta.glob("../assets/board-view/*.jpg", {
  eager: true,
});

console.log("Icons loaded:", icons);
console.log("Board views loaded:", boardViews);

export const boards = [
  {
    id: 1,
    name: "Bois Rieur de Méga Wiggler",
    description:
      "Un bois mystérieux et vibrant, peuplé par les redoutables Wiggler géants.",
    difficulty: "Moyen",
    type: "Aventure",
    icon:
      icons["../assets/board-icons/super-mario-party-jamboree-board-icon-1.png"]
        ?.default || "",
    boardView:
      boardViews[
        "../assets/board-view/super-mario-party-jamboree-website-board-1.jpg"
      ]?.default || "",
  },
  {
    id: 2,
    name: "Circuit Débridé",
    description:
      "Un circuit rapide et sinueux, idéal pour les courses effrénées.",
    difficulty: "Facile",
    type: "Course",
    icon:
      icons["../assets/board-icons/super-mario-party-jamboree-board-icon-2.png"]
        ?.default || "",
    boardView:
      boardViews[
        "../assets/board-view/super-mario-party-jamboree-website-board-2.jpg"
      ]?.default || "",
  },
  {
    id: 3,
    name: "Île Goomba",
    description:
      "Une île pleine de Goombas et d'obstacles, un vrai défi pour les aventuriers.",
    difficulty: "Difficile",
    type: "Défi",
    icon:
      icons["../assets/board-icons/super-mario-party-jamboree-board-icon-3.png"]
        ?.default || "",
    boardView:
      boardViews[
        "../assets/board-view/super-mario-party-jamboree-website-board-3.jpg"
      ]?.default || "",
  },
  {
    id: 4,
    name: "Base Secrète de Bowser",
    description:
      "La base secrète de Bowser, avec des pièges sournois et des ennemis redoutables.",
    difficulty: "Très Difficile",
    type: "Boss",
    icon:
      icons["../assets/board-icons/super-mario-party-jamboree-board-icon-7.png"]
        ?.default || "",
    boardView:
      boardViews[
        "../assets/board-view/super-mario-party-jamboree-website-board-7.jpg"
      ]?.default || "",
  },
  {
    id: 5,
    name: "Galeries Multicolores",
    description:
      "Un lieu magique aux couleurs vives, offrant un parcours fascinant et surprenant.",
    difficulty: "Moyen",
    type: "Magique",
    icon:
      icons["../assets/board-icons/super-mario-party-jamboree-board-icon-4.png"]
        ?.default || "",
    boardView:
      boardViews[
        "../assets/board-view/super-mario-party-jamboree-website-board-4.jpg"
      ]?.default || "",
  },
  {
    id: 6,
    name: "Pays Western",
    description:
      "Un environnement sauvage inspiré des classiques westerns, plein de duels et de défis.",
    difficulty: "Moyen",
    type: "Thème",
    icon:
      icons["../assets/board-icons/super-mario-party-jamboree-board-icon-5.png"]
        ?.default || "",
    boardView:
      boardViews[
        "../assets/board-view/super-mario-party-jamboree-website-board-5.jpg"
      ]?.default || "",
  },
  {
    id: 7,
    name: "Château Arc-en-Ciel de Mario",
    description:
      "Un château magique rempli de mystères et de couleurs éclatantes.",
    difficulty: "Facile",
    type: "Classique",
    icon:
      icons["../assets/board-icons/super-mario-party-jamboree-board-icon-6.png"]
        ?.default || "",
    boardView:
      boardViews[
        "../assets/board-view/super-mario-party-jamboree-website-board-6.jpg"
      ]?.default || "",
  },
];
