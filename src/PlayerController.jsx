import { useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrthographicCamera, Environment } from "@react-three/drei";
import { Mario } from "./models/Mario";
import { useMarioStore } from "./store/store";

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

  useEffect(() => {
    setWalkBounds(walkBounds);
    setWalkSpeed(walkSpeed);
  }, [walkBounds, walkSpeed, setWalkBounds, setWalkSpeed]);

  const containerStyle = {
    width: width,
    height: height,
    position: position,
    bottom: bottom,
  };

  return (
    <div style={containerStyle} className="mario-scene-container">
      <Canvas shadows style={{ background: backgroundColor }}>
        <OrthographicCamera
          makeDefault
          position={[0, 0, 10]}
          zoom={70}
          near={0.1}
          far={1000}
        />

        <ambientLight intensity={0.8} />
        <directionalLight
          position={[5, 5, 10]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />

        {<Mario />}

        <Environment preset="sunset" />
      </Canvas>
    </div>
  );
};

export default MarioScene;
