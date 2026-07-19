import { useState } from "react";
import StaffDashboard from "./pages/StaffDashboard";
import FanApp from "./pages/FanApp"

function AppSwitcher({ mode, setMode }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: 8,
        padding: "8px 0",
        background: "#0b0d10",
        borderBottom: "1px solid #1f1f23"
      }}
    >
      {["staff", "fan"].map((m) => (
        <button
          key={m}
          onClick={() => setMode(m)}
          style={{
            padding: "6px 16px",
            borderRadius: 999,
            border: "1px solid #333",
            background: mode === m ? "#61cbf2" : "#1e1e1e",
            color: "#fff",
            fontSize: 12,
            fontWeight: 600,
            cursor: "pointer"
          }}
        >
          {m === "staff" ? "Staff Dashboard" : "Fan App"}
        </button>
      ))}
    </div>
  );
}

function App() {
  const [mode, setMode] = useState("staff");

  return (
    <div>
      <AppSwitcher mode={mode} setMode={setMode} />
      {mode === "staff" ? <StaffDashboard /> : <FanApp />}
    </div>
  );
}
export default App;
