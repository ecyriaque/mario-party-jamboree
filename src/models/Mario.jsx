import React, { useRef } from "react";
import { useGraph, useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";
import { useMarioStore } from "../store/store";
import { LoopOnce } from "three";
import { maxSpeed } from "../constants";

// Composant Mario qui charge et anime le modèle 3D
export function Mario() {
  const group = useRef();
  const { scene, animations } = useGLTF("/models/player/mario.glb");
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone);
  const { actions } = useAnimations(animations, group);

  const currentAction = useRef();

  const { playerAnimation, walkDirection, walkBounds, walkSpeed } =
    useMarioStore();
  const { setPlayerPosition, setWalkDirection } = useMarioStore();

  useFrame((state, delta) => {
    if (group.current) {
      const currentX = group.current.position.x;

      const newX = currentX + walkSpeed * walkDirection * delta;
      group.current.position.x = newX;

      group.current.rotation.y = walkDirection > 0 ? Math.PI : 0;

      if (newX > walkBounds.max) {
        setWalkDirection(-1);
      } else if (newX < walkBounds.min) {
        setWalkDirection(1);
      }

      setPlayerPosition({
        x: newX,
        y: group.current.position.y,
        z: group.current.position.z,
      });

      const animation = walkDirection !== 0 ? "walk" : "idle";
      const nextAction = actions[animation];

      if (nextAction && currentAction.current !== nextAction) {
        if (currentAction.current) {
          currentAction.current.fadeOut(0.3);
        }
        nextAction.reset().fadeIn(0.3).play();
        currentAction.current = nextAction;
      }
    }
  });

  return (
    <group ref={group} position={[0, 0, 0]} dispose={null}>
      <primitive object={clone} scale={1} />
    </group>
  );
}

// Préchargement du modèle pour de meilleures performances
useGLTF.preload("/models/player/mario.glb");

// Version simplifiée au cas où le modèle GLB n'est pas disponible
export function SimpleMario() {
  const marioRef = useRef();

  const { walkDirection, walkBounds, walkSpeed } = useMarioStore();
  const { setPlayerPosition, setWalkDirection } = useMarioStore();

  useFrame((state, delta) => {
    if (marioRef.current) {
      const currentX = marioRef.current.position.x;

      const newX = currentX + walkSpeed * walkDirection * delta;
      marioRef.current.position.x = newX;

      marioRef.current.rotation.y = walkDirection > 0 ? Math.PI : 0;

      const walkCycle = state.clock.getElapsedTime() * 5;
      const bounce = Math.sin(walkCycle) * 0.05;
      marioRef.current.position.y = bounce + 0.5;

      const legAngle = Math.sin(walkCycle) * 0.3;

      if (marioRef.current.children[3] && marioRef.current.children[4]) {
        marioRef.current.children[3].rotation.x = -legAngle;
        marioRef.current.children[4].rotation.x = legAngle;
      }

      if (marioRef.current.children[5] && marioRef.current.children[6]) {
        marioRef.current.children[5].rotation.x = legAngle;
        marioRef.current.children[6].rotation.x = -legAngle;
      }

      if (newX > walkBounds.max) {
        setWalkDirection(-1);
      } else if (newX < walkBounds.min) {
        setWalkDirection(1);
      }

      setPlayerPosition({
        x: newX,
        y: marioRef.current.position.y,
        z: marioRef.current.position.z,
      });
    }
  });

  const bodyColor = "#ff0000";
  const hatColor = "#ff0000";
  const faceColor = "#ffccaa";
  const overallsColor = "#0000ff";

  return (
    <group ref={marioRef} position={[0, 0.5, 0]}>
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[0.5, 0.8, 0.3]} />
        <meshStandardMaterial color={overallsColor} />
      </mesh>

      <mesh position={[0, 0.65, 0]} castShadow>
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshStandardMaterial color={faceColor} />
      </mesh>

      <mesh position={[0, 0.9, 0]} castShadow>
        <boxGeometry args={[0.45, 0.15, 0.45]} />
        <meshStandardMaterial color={hatColor} />
      </mesh>

      <mesh position={[-0.35, 0, 0]} castShadow>
        <boxGeometry args={[0.2, 0.6, 0.2]} />
        <meshStandardMaterial color={bodyColor} />
      </mesh>

      <mesh position={[0.35, 0, 0]} castShadow>
        <boxGeometry args={[0.2, 0.6, 0.2]} />
        <meshStandardMaterial color={bodyColor} />
      </mesh>

      <mesh position={[-0.15, -0.6, 0]} castShadow>
        <boxGeometry args={[0.2, 0.4, 0.2]} />
        <meshStandardMaterial color={overallsColor} />
      </mesh>

      <mesh position={[0.15, -0.6, 0]} castShadow>
        <boxGeometry args={[0.2, 0.4, 0.2]} />
        <meshStandardMaterial color={overallsColor} />
      </mesh>
    </group>
  );
}
