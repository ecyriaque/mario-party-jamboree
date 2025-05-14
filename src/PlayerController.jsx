import { useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import { Mario, SimpleMario } from "./models/Mario";
import { CapsuleCollider, RigidBody, useRapier } from "@react-three/rapier";
import { useKeyboardControls } from "@react-three/drei";
import { MathUtils, Vector3 } from "three";
import { useGameStore, useMarioStore } from "./store/store";
import { maxSpeed } from "./constants";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, Environment, Grid } from "@react-three/drei";

export const PlayerController = () => {
  const playerRef = useRef();
  const rbRef = useRef();

  const cameraPositionRef = useRef();
  const lookAtPositionRef = useRef();
  const speedRef = useRef(0);

  const setPlayerAnimation = useGameStore((state) => state.setPlayerAnimation);
  const setPlayerPosition = useGameStore((state) => state.setPlayerPosition);
  const [, get] = useKeyboardControls();
  const { lerp } = MathUtils;

  let isJumpHeld = false;
  let landingDuration = 0.4;

  const { world, rapier } = useRapier();

  const ground = useRef(null);
  const hasJustLanded = useRef(false);

  useFrame((state, delta) => {
    if (
      !playerRef.current ||
      !rbRef.current ||
      !cameraPositionRef.current ||
      !lookAtPositionRef.current
    )
      return;

    const camera = state.camera;
    const joystick = useGameStore.getState().joystick;
    const jumpButtonPressed = useGameStore.getState().jumpButtonPressed;
    const lookAtCharacter = useGameStore.getState().lookAtCharacter;
    const { forward, back, left, right, jump } = get();

    const backwardJoystick = joystick.y < 0 ? -joystick.y : 0;
    const joystickInfluence = joystick.x * (1 + backwardJoystick);

    playerRef.current.rotation.y = lerp(
      playerRef.current.rotation.y,
      playerRef.current.rotation.y -
        joystickInfluence +
        Number(left) -
        Number(right),
      3 * delta
    );

    const playerRotation = playerRef.current.rotation.y;

    const forwardDirection = new Vector3(
      Math.sin(playerRotation),
      0,
      Math.cos(playerRotation)
    );

    if (ground.current) {
      const joystickSpeed = (joystick.distance / 100) * maxSpeed;
      speedRef.current = lerp(
        speedRef.current,
        forward ? maxSpeed : joystickSpeed ? joystickSpeed : 0,
        4 * delta
      );
    }

    if (rbRef.current.linvel().y > 2 && !ground.current) {
      setPlayerAnimation("jump");
    } else if (rbRef.current.linvel().y < 2 && !ground.current) {
      setPlayerAnimation("jump");
      rbRef.current.setGravityScale(2.1);
    } else if (hasJustLanded.current) {
      setPlayerAnimation("land");
      landingDuration -= delta;
    } else {
      if (ground.current) {
        setPlayerAnimation(
          speedRef.current > 2
            ? "run"
            : speedRef.current > 0.1
            ? "walk"
            : "idle"
        );
        rbRef.current.setGravityScale(1.2);
      }
    }

    const ray = new rapier.Ray(rbRef.current.translation(), {
      x: 0,
      y: -2,
      z: 0,
    });

    const raycastResult = world.castRayAndGetNormal(
      ray,
      1,
      false,
      undefined,
      undefined,
      undefined,
      rbRef.current.translation()
    );

    if (raycastResult) {
      const collider = raycastResult.collider;

      const userData = collider.parent()?.userData;
      const wasGrounded = ground.current;
      ground.current = Boolean(userData);

      if (!wasGrounded && ground.current) {
        hasJustLanded.current = true;
        landingDuration = 0.4;
      }

      if (hasJustLanded.current) {
        landingDuration -= delta;
        if (landingDuration <= 0) {
          hasJustLanded.current = false;
        }
      }
    }
    rbRef.current.setLinvel({
      x: forwardDirection.x * speedRef.current,
      y: rbRef.current.linvel().y,
      z: forwardDirection.z * speedRef.current,
    });

    if ((jump || jumpButtonPressed) && !isJumpHeld && ground.current) {
      rbRef.current.applyImpulse({ x: 0, y: 7, z: 0 }, true);
      isJumpHeld = true;
    }

    if (!jump && !jumpButtonPressed) {
      isJumpHeld = false;
    }

    rbRef.current.setEnabledRotations(false, false, false, true);

    camera.position.lerp(
      cameraPositionRef.current.getWorldPosition(new Vector3()),
      2 * delta
    );

    camera.lookAt(lookAtPositionRef.current.getWorldPosition(new Vector3()));
    setPlayerPosition(rbRef.current.translation());
  });

  return (
    <RigidBody ccd canSleep={false} colliders={false} ref={rbRef}>
      <CapsuleCollider args={[0.3, 0.5]} />
      <group ref={playerRef}>
        <group ref={cameraPositionRef} position={[0, 2, -6]} />
        <group ref={lookAtPositionRef} />
        <Mario speedRef={speedRef} />
      </group>
    </RigidBody>
  );
};

// Composant sol sur lequel Mario marche
const Floor = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
      <planeGeometry args={[50, 50]} />
      <meshStandardMaterial color="#228822" roughness={0.8} />
    </mesh>
  );
};

// Scène 3D complète avec Mario
const MarioScene = ({
  width = "100%",
  height = "200px",
  position = "absolute",
  bottom = 0,
  walkBounds = { min: -8, max: 8 },
  walkSpeed = 1.5,
  backgroundColor = "transparent",
  useSimpleModel = false,
}) => {
  const { setWalkBounds, setWalkSpeed } = useMarioStore();

  // Configuration initiale
  useEffect(() => {
    setWalkBounds(walkBounds);
    setWalkSpeed(walkSpeed);
  }, [walkBounds, walkSpeed, setWalkBounds, setWalkSpeed]);

  // Style du conteneur
  const containerStyle = {
    width: width,
    height: height,
    position: position,
    bottom: bottom,
    zIndex: 10,
    pointerEvents: "none", // Pour permettre de cliquer à travers sur les éléments en dessous
  };

  return (
    <div style={containerStyle}>
      <Canvas shadows style={{ background: backgroundColor }}>
        {/* Caméra */}
        <PerspectiveCamera makeDefault position={[0, 2, 5]} />

        {/* Lumières */}
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />

        {/* Sol */}
        <Floor />

        {/* Mario - utilise le modèle simple ou GLB selon l'option */}
        {useSimpleModel ? <SimpleMario /> : <Mario />}

        {/* Environnement et grille */}
        <Environment preset="sunset" />
        <Grid
          args={[50, 50]}
          cellSize={1}
          cellThickness={0.5}
          cellColor="#6f6f6f"
          sectionSize={5}
          sectionThickness={1}
          sectionColor="#9d4b4b"
          position={[0, -0.49, 0]}
          fadeDistance={25}
          fadeStrength={1}
        />
      </Canvas>
    </div>
  );
};

export default MarioScene;
