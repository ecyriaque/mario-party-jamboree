import RandomBoardSelector from "./RandomBoardSelector";
import Animated3DModel from "./components/Animated3DModel";
import "./index.css";

function App() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          height: "350px",
          width: "100%",
          position: "relative",
          zIndex: 10,
        }}
      >
        <Animated3DModel
          style={{ maxWidth: 500, margin: "0 auto", marginTop: 30 }}
        />
      </div>
      <div style={{ width: "100%", position: "relative", zIndex: 1 }}>
        <RandomBoardSelector />
      </div>
    </div>
  );
}

export default App;
