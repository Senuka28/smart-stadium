import { useState } from "react";
import FanHome from "./fan/FanHome";
import FanMap from "./fan/FanMap";
import FanTickets from "./fan/FanTickets";
import FanHelp from "./fan/FanHelp";
import FanLanguage from "./fan/FanLanguage";

const TABS = [
  { id: "home", label: "Home", icon: "🏠" },
  { id: "map", label: "Map", icon: "🗺️" },
  { id: "tickets", label: "My Seat", icon: "🎟️" },
  { id: "help", label: "Help", icon: "💬" },
  { id: "language", label: "EN", icon: "🌐" }
];

export default function FanApp() {
  const [tab, setTab] = useState("home");

  const renderTab = () => {
    switch (tab) {
      case "home": return <FanHome />;
      case "map": return <FanMap />;
      case "tickets": return <FanTickets />;
      case "help": return <FanHelp />;
      case "language": return <FanLanguage />;
      default: return null;
    }
  };

  return (
    <div
      style={{
        background: "#050509",
        color: "#f5f5f5",
        minHeight: "100vh",
        maxWidth: 480,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <div style={{ flex: 1, paddingBottom: 70 }}>{renderTab()}</div>

      {/* Bottom tab bar */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          width: "100%",
          maxWidth: 480,
          display: "flex",
          justifyContent: "space-around",
          padding: "10px 0",
          background: "#0b0d10",
          borderTop: "1px solid #1f1f23"
        }}
      >
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              background: "none",
              border: "none",
              color: tab === t.id ? "#4ade80" : "#9e9e9e",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              fontSize: 10,
              gap: 2,
              cursor: "pointer"
            }}
          >
            <span style={{ fontSize: 18 }}>{t.icon}</span>
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}