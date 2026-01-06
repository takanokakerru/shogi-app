import ShogiBoard from "./components/ShogiBoard";

export default function App() {
  return (
    
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <h1>将棋</h1>
      <ShogiBoard />
    </div>
  );
}

