import { Vector3 } from "three";
import { create } from "zustand";
import { MARIO_CONSTANTS } from "../constants";

export const useGameStore = create((set) => ({
  playerPosition: null,
  setPlayerPosition: (position) => set({ playerPosition: position }),
  playerAnimation: "idle",
  setPlayerAnimation: (animation) => set({ playerAnimation: animation }),
  joystick: { x: 0, y: 0, distance: 0 },
  setJoystick: (joystick) => set({ joystick: joystick }),
  jumpButtonPressed: false,
  setJumpButtonPressed: (pressed) => set({ jumpButtonPressed: pressed }),
  lookAtCharacter: new Vector3(),
  setLookAtCharacter: (lookAtCharacter) =>
    set({ lookAtCharacter: lookAtCharacter }),
}));

// Store spécifique pour la gestion de Mario 3D
export const useMarioStore = create((set) => ({
  // État de l'animation
  playerAnimation: MARIO_CONSTANTS.ANIMATION_STATES.WALK,
  playerPosition: { x: 0, y: 0, z: 0 },

  // Direction et vitesse de marche
  walkDirection: 1, // 1 = droite, -1 = gauche
  walkSpeed: MARIO_CONSTANTS.DEFAULT_WALK_SPEED,
  walkBounds: MARIO_CONSTANTS.WALK_BOUNDS,

  // Actions pour mettre à jour l'état
  setPlayerAnimation: (animation) => set({ playerAnimation: animation }),
  setPlayerPosition: (position) => set({ playerPosition: position }),
  setWalkDirection: (direction) => set({ walkDirection: direction }),
  setWalkSpeed: (speed) => set({ walkSpeed: speed }),
  setWalkBounds: (bounds) => set({ walkBounds: bounds }),

  // Réinitialiser la position
  resetPlayerPosition: () =>
    set({
      playerPosition: { x: 0, y: 0, z: 0 },
      walkDirection: 1,
    }),
}));
