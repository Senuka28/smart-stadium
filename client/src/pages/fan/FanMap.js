import { useState } from "react";

const WAIT_COLORS = {
  short: "#4ade80",
  moderate: "#ffb300",
  long: "#e53935"
};

const NEARBY_OPTIONS = [
  {
    id: "restroom-r12",
    name: "Nearest Restroom",
    badge: "BEST OPTION",
    subtitle: "Restroom - Concourse North",
    walkMin: 2,
    waitMin: 2,
    waitTier: "short",
    x: 320,
    y: 210
  },
  {
    id: "concession-14",
    name: "Concession Stand - Grill",
    subtitle: "Grills & Beverages · Concourse North",
    walkMin: 4,
    waitMin: 5,
    waitTier: "moderate",
    x: 460,
    y: 210
  },
  {
    id: "concession-9",
    name: "Concession Stand - Snacks",
    subtitleTag: "Farther, but fastest",
    subtitle: "Snacks & Drinks · Concourse West",
    walkMin: 7,
    waitMin: 1,
    waitTier: "short",
    x: 130,
    y: 210
  }
];

const YOU = { x: 150, y: 210 };
const GATE_TARGET = { x: 560, y: 210, label: "3" };

function WaitDot({ tier }) {
  return (
    <span
      style={{
        display: "inline-block",
        width: 8,
        height: 8,
        borderRadius: "50%",
        background: WAIT_COLORS[tier],
        marginRight: 6
      }}
    />
  );
}

export default function FanMap() {
  const [highlighted, setHighlighted] = useState("restroom-r12");
  const selected = NEARBY_OPTIONS.find((o) => o.id === highlighted);

  return (
    <div style={{ padding: 16 }}>
      {/* Status banner */}
      <div
        style={{
          background: "rgba(74, 222, 128, 0.1)",
          border: "1px solid rgba(74,222,128,0.35)",
          borderRadius: 10,
          padding: "10px 14px",
          fontSize: 12,
          color: "#4ade80",
          marginBottom: 16
        }}
      >
        ✓ All systems normal · Game day operations active
      </div>

      {/* Header row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #4ade80, #22c55e)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18
            }}
          >
            🏟️
          </div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700 }}>Smart Stadium</div>
            <div style={{ fontSize: 12, color: "#9e9e9e" }}>Lot A → Section 132</div>
          </div>
        </div>
        <div
          style={{
            padding: "4px 10px",
            borderRadius: 999,
            background: "rgba(78, 140, 255, 0.15)",
            color: "#4e8cff",
            fontSize: 11,
            fontWeight: 700,
            border: "1px solid rgba(78,140,255,0.4)"
          }}
        >
          ● LIVE
        </div>
      </div>

      {/* Route time pills */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20, overflowX: "auto" }}>
        <div
          style={{
            padding: "8px 14px",
            borderRadius: 999,
            border: "1px solid #333",
            background: "#141416",
            fontSize: 12,
            whiteSpace: "nowrap"
          }}
        >
          🕐 Lot A → Gate 3 <span style={{ color: "#4ade80", fontWeight: 700 }}>7 min</span>
        </div>
        <div
          style={{
            padding: "8px 14px",
            borderRadius: 999,
            border: "1px solid #333",
            background: "#141416",
            fontSize: 12,
            whiteSpace: "nowrap"
          }}
        >
          🕐 Gate 3 → Seat <span style={{ color: "#4ade80", fontWeight: 700 }}>4 min</span>
        </div>
      </div>

      {/* Location header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <div style={{ fontSize: 11, color: "#9e9e9e", letterSpacing: 1 }}>YOUR LOCATION</div>
        <div style={{ fontSize: 11, color: "#4e8cff" }}>📍 Concourse North</div>
      </div>

      {/* Mini map */}
      <div
        style={{
          borderRadius: 14,
          border: "1px solid #262626",
          background: "#0b0d10",
          padding: 12,
          marginBottom: 16
        }}
      >
        <svg viewBox="0 0 620 280" style={{ width: "100%" }}>
          {/* Field */}
          <rect x={200} y={20} width={220} height={70} rx={6} fill="#0d2818" stroke="#1f3d2a" />
          <text x={310} y={60} textAnchor="middle" fill="#4ade80" fontSize={11} opacity={0.5}>FIELD</text>

          {/* Concourse strip */}
          <rect x={20} y={130} width={580} height={70} fill="#12151a" stroke="#262626" />
          {["Sec 128", "Sec 129", "Sec 130", "Sec 131", "Sec 132", "Sec 133"].map((label, i) => (
            <text key={label} x={70 + i * 95} y={125} textAnchor="middle" fill="#666" fontSize={10}>{label}</text>
          ))}

          {/* Route line: you -> stops -> gate */}
          <polyline
            points={`${YOU.x},${YOU.y} ${selected.x},${selected.y} ${GATE_TARGET.x},${GATE_TARGET.y}`}
            fill="none"
            stroke="#4ade80"
            strokeWidth={2}
            strokeDasharray="6 5"
          />

          {/* Gate 1 (left side) */}
          <text x={22} y={155} fill="#666" fontSize={10} fontWeight="bold">GATE</text>
          <text x={30} y={168} fill="#666" fontSize={10} fontWeight="bold">1</text>

          {/* Gate 3 (destination, right side) */}
          <text x={GATE_TARGET.x + 10} y={155} fill="#4e8cff" fontSize={10} fontWeight="bold">GATE</text>
          <text x={GATE_TARGET.x + 15} y={168} fill="#4e8cff" fontSize={10} fontWeight="bold">3</text>
          <circle cx={GATE_TARGET.x} cy={GATE_TARGET.y} r={14} fill="#1e1e1e" stroke="#4e8cff" strokeWidth={2} />
          <text x={GATE_TARGET.x} y={GATE_TARGET.y + 4} textAnchor="middle" fill="#f5f5f5" fontSize={10}>132</text>

          {/* You are here */}
          <circle cx={YOU.x} cy={YOU.y} r={16} fill="#4ade8020" stroke="#4ade80" strokeWidth={2} />
          <circle cx={YOU.x} cy={YOU.y} r={7} fill="#4ade80" />
          <rect x={YOU.x - 16} y={YOU.y + 20} width={34} height={16} rx={8} fill="#4ade80" />
          <text x={YOU.x + 1} y={YOU.y + 31} textAnchor="middle" fill="#0b0d10" fontSize={9} fontWeight="bold">YOU</text>

          {/* Nearby option markers */}
          {NEARBY_OPTIONS.map((opt) => (
            <g key={opt.id} onClick={() => setHighlighted(opt.id)} style={{ cursor: "pointer" }}>
              <circle
                cx={opt.x}
                cy={opt.y}
                r={13}
                fill="#1e1e1e"
                stroke={WAIT_COLORS[opt.waitTier]}
                strokeWidth={highlighted === opt.id ? 3 : 2}
              />
              <text x={opt.x} y={opt.y + 3} textAnchor="middle" fill="#f5f5f5" fontSize={9}>
                {opt.id.includes("restroom") ? "WC" : "🍔"}
              </text>
            </g>
          ))}

          {/* Callout for selected */}
          <g>
            <rect x={selected.x - 65} y={selected.y - 55} width={130} height={30} rx={6} fill="#0b0d10" stroke="#4ade80" />
            <text x={selected.x} y={selected.y - 40} textAnchor="middle" fill="#f5f5f5" fontSize={10} fontWeight="bold">
              {selected.name.replace("Nearest ", "")}
            </text>
            <text x={selected.x} y={selected.y - 28} textAnchor="middle" fill="#4ade80" fontSize={9}>
              ~{selected.waitMin} min wait
            </text>
          </g>
        </svg>

        {/* Legend */}
        <div style={{ display: "flex", gap: 16, marginTop: 8, fontSize: 10, color: "#9e9e9e", flexWrap: "wrap" }}>
          <span><WaitDot tier="short" />Short wait</span>
          <span><WaitDot tier="moderate" />Moderate</span>
          <span><WaitDot tier="long" />Long wait</span>
          <span style={{ marginLeft: "auto" }}>— Route</span>
        </div>
      </div>

      {/* Nearby options list */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <div style={{ fontSize: 11, color: "#9e9e9e", letterSpacing: 1 }}>NEARBY OPTIONS</div>
        <div style={{ fontSize: 11, color: "#9e9e9e" }}>Tap to highlight</div>
      </div>

      {NEARBY_OPTIONS.map((opt) => (
        <div
          key={opt.id}
          onClick={() => setHighlighted(opt.id)}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "#141416",
            borderRadius: 10,
            padding: "14px 16px",
            marginBottom: 10,
            border: highlighted === opt.id ? `1px solid ${WAIT_COLORS[opt.waitTier]}` : "1px solid #262626",
            borderLeft: `3px solid ${WAIT_COLORS[opt.waitTier]}`,
            cursor: "pointer"
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
              <span style={{ fontSize: 14, fontWeight: 600 }}>{opt.name}</span>
              {opt.badge && (
                <span
                  style={{
                    fontSize: 9,
                    fontWeight: 700,
                    padding: "2px 6px",
                    borderRadius: 999,
                    background: "#4ade8026",
                    color: "#4ade80",
                    border: "1px solid #4ade8066"
                  }}
                >
                  {opt.badge}
                </span>
              )}
              {opt.subtitleTag && (
                <span style={{ fontSize: 11, color: "#9e9e9e" }}>· {opt.subtitleTag}</span>
              )}
            </div>
            <div style={{ fontSize: 12, color: "#9e9e9e", marginBottom: 4 }}>{opt.subtitle}</div>
            <div style={{ fontSize: 12, color: WAIT_COLORS[opt.waitTier] }}>
              🚶 {opt.walkMin} min walk · ~{opt.waitMin} min wait
            </div>
          </div>
          <span style={{ color: "#666", fontSize: 16 }}>›</span>
        </div>
      ))}
    </div>
  );
}