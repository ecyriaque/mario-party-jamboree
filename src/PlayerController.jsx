import { useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, Environment, Grid } from "@react-three/drei";
import { Mario, SimpleMario } from "./models/Mario";
import { useMarioStore } from "./store/store";

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
