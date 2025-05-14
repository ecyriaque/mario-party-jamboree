export const maxSpeed = 7;

// Constantes pour le déplacement de Mario
export const MARIO_CONSTANTS = {
  MAX_WALK_SPEED: 3,
  DEFAULT_WALK_SPEED: 1.5,
  WALK_BOUNDS: { min: -10, max: 10 },
  ANIMATION_STATES: {
    IDLE: "idle",
    WALK: "walk",
    RUN: "run",
    JUMP: "jump",
  },
  // Constantes pour le saut
  JUMP_HEIGHT: 3.5,
  JUMP_DURATION: 1.2, // secondes
  BUTTON_POSITION: { x: 0, y: 0 }, // sera défini dynamiquement
};
