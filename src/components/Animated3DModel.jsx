import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Stage, useGLTF } from "@react-three/drei";
import { useRef, useState } from "react";

function MarioModel({ isJumping }) {
  const walkModel = useGLTF("/models/walking_mario_64.glb");
  const jumpModel = useGLTF("/models/jumping.glb");
  const modelRef = useRef();

  useFrame((state, delta) => {
    if (modelRef.current) {
      // Animation de marche
      modelRef.current.position.x += delta * 0.5;
      if (modelRef.current.position.x > 2) {
        modelRef.current.position.x = -2;
      }
      // Animation de rotation pour éviter la T-pose
      modelRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1.2} floatIntensity={1.5}>
      <primitive
        ref={modelRef}
        object={isJumping ? jumpModel.scene : walkModel.scene}
        scale={1.5}
        castShadow
        receiveShadow
      />
    </Float>
  );
}

export default function Animated3DModel({ style, onJump }) {
  const [isJumping, setIsJumping] = useState(false);

  const handleJump = () => {
    setIsJumping(true);
    setTimeout(() => setIsJumping(false), 1000); // Retour à la marche après 1 seconde
    if (onJump) onJump();
  };

  return (
    <div style={{ width: "100%", height: "350px", ...style }}>
      <Canvas shadows camera={{ position: [2, 2, 4], fov: 50 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow />
        <Stage environment="city" intensity={0.6} shadows="contact">
          <MarioModel isJumping={isJumping} />
        </Stage>
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          autoRotate
          autoRotateSpeed={2}
        />
      </Canvas>
    </div>
  );
}
