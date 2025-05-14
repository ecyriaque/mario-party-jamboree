import React, { useRef } from "react";
import { useGraph, useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";
import { useMarioStore } from "../store/store";
import { LoopOnce, Vector3 } from "three";
import { MARIO_CONSTANTS } from "../constants";

export function Mario() {
  const group = useRef();
  const jumpStartTime = useRef(0);
  const hasReachedTargetX = useRef(false);

  const { scene, animations } = useGLTF("/models/player/mario.glb");

  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone);
  const { actions } = useAnimations(animations, group);

  const currentAction = useRef();

  const {
    playerAnimation,
    walkDirection,
    walkBounds,
    walkSpeed,
    isJumping,
    jumpTarget,
    buttonClicked,
  } = useMarioStore();

  const {
    setPlayerPosition,
    setWalkDirection,
    setIsJumping,
    setJumpHeight,
    setPlayerHasHitButton,
  } = useMarioStore();

  React.useEffect(() => {
    console.log("Modèle chargé:", scene);
    console.log("Animations disponibles:", animations);
    console.log("Actions disponibles:", actions);
  }, [scene, animations, actions]);

  useFrame((state, delta) => {
    if (!group.current) return;

    const currentX = group.current.position.x;
    const currentY = group.current.position.y;

    let newX = currentX;
    let newY = currentY;
    let animation = "idle";

    if (buttonClicked && jumpTarget) {
      const distanceToTarget = Math.abs(currentX - jumpTarget.x);

      if (!hasReachedTargetX.current && !isJumping) {
        if (currentX < jumpTarget.x) {
          setWalkDirection(1);
        } else {
          setWalkDirection(-1);
        }

        newX = currentX + walkSpeed * walkDirection * delta * 2;
        animation = MARIO_CONSTANTS.ANIMATION_STATES.RUN;

        if (Math.abs(newX - jumpTarget.x) < 0.3) {
          hasReachedTargetX.current = true;
          newX = jumpTarget.x; // Aligner exactement
        }
      } else if (hasReachedTargetX.current && !isJumping) {
        setIsJumping(true);
        jumpStartTime.current = state.clock.getElapsedTime();
        animation = actions["jump"] ? "jump" : "run";
      } else if (isJumping) {
        const jumpTime = state.clock.getElapsedTime() - jumpStartTime.current;
        const jumpProgress = Math.min(
          jumpTime / MARIO_CONSTANTS.JUMP_DURATION,
          1
        );

        newX = jumpTarget.x;

        if (jumpProgress < 1) {
          const jumpCurve =
            4 *
            MARIO_CONSTANTS.JUMP_HEIGHT *
            (jumpProgress - jumpProgress * jumpProgress);
          newY = -0.6 + jumpCurve;

          setJumpHeight(jumpCurve);

          animation = actions["jump"] ? "jump" : "run";

          if (jumpProgress > 0.45 && jumpProgress < 0.55) {
            setPlayerHasHitButton(true);

            setTimeout(() => {
              const { setButtonClicked } = useMarioStore.getState();
              setButtonClicked(false);
            }, 100);
          }
        } else {
          newY = -0.6;
          setIsJumping(false);
          setJumpHeight(0);
          hasReachedTargetX.current = false;
          animation = "idle";
        }
      }
    } else {
      newX = currentX + walkSpeed * walkDirection * delta;
      animation = walkDirection !== 0 ? "run" : "idle";

      if (newX > walkBounds.max) {
        setWalkDirection(-1);
      } else if (newX < walkBounds.min) {
        setWalkDirection(1);
      }
    }

    group.current.position.x = newX;
    group.current.position.y = newY;

    group.current.rotation.y = walkDirection > 0 ? Math.PI / 2 : -Math.PI / 2;

    setPlayerPosition({
      x: newX,
      y: newY,
      z: group.current.position.z,
    });

    const nextAction = actions[animation];
    if (nextAction && currentAction.current !== nextAction) {
      if (currentAction.current) {
        currentAction.current.fadeOut(0.3);
      }
      nextAction.reset().fadeIn(0.3).play();

      // Si c'est une animation de saut, la jouer une seule fois
      if (animation === "jump") {
        nextAction.setLoop(LoopOnce);
        nextAction.clampWhenFinished = true;
      }

      currentAction.current = nextAction;
    }
  });

  return (
    <group ref={group} position={[0, -0.6, 0]} scale={1.2} dispose={null}>
      <primitive object={clone} />
    </group>
  );
}

useGLTF.preload("/models/player/mario.glb");
