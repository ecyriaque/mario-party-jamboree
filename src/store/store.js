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

export const useMarioStore = create((set) => ({
  playerAnimation: MARIO_CONSTANTS.ANIMATION_STATES.WALK,
  playerPosition: { x: 0, y: 0, z: 0 },

  walkDirection: 1,
  walkSpeed: MARIO_CONSTANTS.DEFAULT_WALK_SPEED,
  walkBounds: MARIO_CONSTANTS.WALK_BOUNDS,

  isJumping: false,
  jumpHeight: 0,
  jumpTarget: null,

  buttonClicked: false,
  playerHasHitButton: false,

  setPlayerAnimation: (animation) => set({ playerAnimation: animation }),
  setPlayerPosition: (position) => set({ playerPosition: position }),
  setWalkDirection: (direction) => set({ walkDirection: direction }),
  setWalkSpeed: (speed) => set({ walkSpeed: speed }),
  setWalkBounds: (bounds) => set({ walkBounds: bounds }),

  setIsJumping: (jumping) => set({ isJumping: jumping }),
  setJumpHeight: (height) => set({ jumpHeight: height }),
  setJumpTarget: (target) => set({ jumpTarget: target }),

  setButtonClicked: (clicked) => set({ buttonClicked: clicked }),
  setPlayerHasHitButton: (hasHit) => set({ playerHasHitButton: hasHit }),

  resetPlayerPosition: () =>
    set({
      playerPosition: { x: 0, y: 0, z: 0 },
      walkDirection: 1,
      isJumping: false,
      jumpHeight: 0,
      jumpTarget: null,
      buttonClicked: false,
      playerHasHitButton: false,
    }),
}));
