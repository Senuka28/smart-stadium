import { useEffect, useState } from "react";

const API_BASE = "http://localhost:4000/api";

function Header({ kpis }) {
  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 24px",
        borderBottom: "1px solid #1f1f23",
        background: "#0b0d10"
      }}
    >
      {/* Left side: title */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: "linear-gradient(135deg, #4e8cff, #36d1dc)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            fontSize: 18
          }}
        >
          S
        </div>
        <div>
          <div style={{ fontSize: 16, fontWeight: 600 }}>Smart Stadium Operations</div>
        </div>
      </div>

      {/* Right side: event + system status */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 12 }}>
        <div style={{ textAlign: "right" }}>
          <div style={{ color: "#a1a1aa" }}>Current Event</div>
          <div style={{ fontWeight: 500 }}>Championship Game - Gates Open 4:00</div>
        </div>
        <div
          style={{
            padding: "4px 10px",
            borderRadius: 999,
            background: "rgba(22, 163, 74, 0.15)",
            color: "#4ade80",
            fontWeight: 500,
            fontSize: 12,
            border: "1px solid rgba(34,197,94,0.4)"
          }}
        >
          ● Systems Operational
        </div>
      </div>
    </header>
  );
}

function StadiumMap({ zones, alerts }) {
  const [selected, setSelected] = useState(null);

  const colors = { green: "#4caf50", yellow: "#ffb300", red: "#e53935" };

  // Fixed angular positions around the oval for gates 1-10
  const gatePositions = {
    Gate1: 100, Gate2: 65, Gate3: 30, Gate4: -5, Gate5: -40,
    Gate6: -75, Gate7: -110, Gate8: -145, Gate9: -180, Gate10: 145
  };

  const cx = 300, cy = 220, rx = 250, ry = 170;

  const zoneAlertCount = (zoneId) =>
    alerts.filter((a) => a.zone_id === zoneId && a.status === "active").length;

  return (
    <div style={{ display: "flex", gap: 16 }}>
      <svg viewBox="0 0 600 440" style={{ width: "100%", maxWidth: 600, background: "#0b0d10" }}>
        {/* Field */}
        <ellipse cx={cx} cy={cy} rx={110} ry={65} fill="#0d2818" stroke="#1f3d2a" strokeWidth={2} />
        <text x={cx} y={cy} textAnchor="middle" fill="#4ade80" fontSize={11} opacity={0.6}>FIELD</text>

        {/* Concourse ring */}
        <ellipse cx={cx} cy={cy} rx={185} ry={120} fill="none" stroke="#333" strokeWidth={1} strokeDasharray="4 4" />

        {/* Concourses (N/E/S/W) */}
        {[
          { id: "ConcourseN", angle: -90, label: "N" },
          { id: "ConcourseE", angle: 0, label: "E" },
          { id: "ConcourseS", angle: 90, label: "S" },
          { id: "ConcourseW", angle: 180, label: "W" }
        ].map(({ id, angle, label }) => {
          const z = zones.find((z) => z.id === id);
          if (!z) return null;
          const rad = (angle * Math.PI) / 180;
          const x = cx + 185 * Math.cos(rad);
          const y = cy + 120 * Math.sin(rad);
          const color = colors[z.density] || "#90a4ae";
          const alertCt = zoneAlertCount(id);
          return (
            <g key={id} onClick={() => setSelected(z)} style={{ cursor: "pointer" }}>
              <rect x={x - 26} y={y - 16} width={52} height={32} rx={6} fill="#1e1e1e" stroke={color} strokeWidth={2} />
              <text x={x} y={y + 4} textAnchor="middle" fill="#f5f5f5" fontSize={11} fontWeight="bold">{label}</text>
              {alertCt > 0 && (
                <circle cx={x + 22} cy={y - 12} r={7} fill="#e53935" />
              )}
              {alertCt > 0 && (
                <text x={x + 22} y={y - 9} textAnchor="middle" fill="#fff" fontSize={9} fontWeight="bold">{alertCt}</text>
              )}
            </g>
          );
        })}

        {/* Gates around perimeter */}
        {zones.filter((z) => z.type === "gate").map((z) => {
          const angle = gatePositions[z.id] ?? 0;
          const rad = (angle * Math.PI) / 180;
          const x = cx + rx * Math.cos(rad);
          const y = cy + ry * Math.sin(rad);
          const color = colors[z.density] || "#90a4ae";
          const alertCt = zoneAlertCount(z.id);
          const gateNum = z.name.replace("Gate ", "");

          return (
            <g key={z.id} onClick={() => setSelected(z)} style={{ cursor: "pointer" }}>
              <circle cx={x} cy={y} r={16} fill="#1e1e1e" stroke={color} strokeWidth={3} />
              <text x={x} y={y + 4} textAnchor="middle" fill="#f5f5f5" fontSize={11} fontWeight="bold">{gateNum}</text>
              {alertCt > 0 && (
                <>
                  <circle cx={x + 13} cy={y - 13} r={7} fill="#e53935" />
                  <text x={x + 13} y={y - 10} textAnchor="middle" fill="#fff" fontSize={9} fontWeight="bold">{alertCt}</text>
                </>
              )}
            </g>
          );
        })}

        {/* Parking lots */}
        {zones.filter((z) => z.type === "parking lot").map((z, i) => (
          <g key={z.id} onClick={() => setSelected(z)} style={{ cursor: "pointer" }}>
            <rect x={20 + i * 90} y={10} width={70} height={30} rx={6} fill="#1e1e1e" stroke="#5c6bc0" strokeWidth={2} />
            <text x={55 + i * 90} y={29} textAnchor="middle" fill="#f5f5f5" fontSize={10}>{z.name}</text>
          </g>
        ))}
      </svg>

      {/* Detail panel */}
      <div style={{ minWidth: 180, background: "#1e1e1e", borderRadius: 8, padding: 12, border: "1px solid #333" }}>
        {!selected ? (
          <div style={{ fontSize: 12, color: "#9e9e9e" }}>Click a gate, concourse, or lot to see details</div>
        ) : (
          <ZoneCard zone={selected} />
        )}
      </div>
    </div>
  );
}


export default function StaffDashboard() {
  const [kpis, setKpis] = useState(null);
  const [zones, setZones] = useState([]);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      const [k, z, a] = await Promise.all([
        fetch(`${API_BASE}/kpis`).then((r) => r.json()),
        fetch(`${API_BASE}/zones`).then((r) => r.json()),
        fetch(`${API_BASE}/alerts`).then((r) => r.json())
      ]);
      setKpis(k);
      setZones(z);
      setAlerts(a);
    };
    fetchAll();
    const id = setInterval(fetchAll, 5000);
    return () => clearInterval(id);
  }, []);

  if (!kpis) return <div style={{ padding: 16 }}>Loading dashboard…</div>;

  return (
    <div style={{ background: "#050509", color: "#f5f5f5", minHeight: "100vh" }}>
      {/* HEADER */}
      <Header kpis={kpis} />

      {/* MAIN CONTENT */}
      <div style={{ padding: "16px 24px" }}>
        {/* KPI tiles */}
        <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
          <KpiTile label="Total In Stadium" value={kpis.total_in_stadium} />
          <KpiTile label="Avg Gate Wait Time" value={`${kpis.avg_gate_wait_time.toFixed(1)} min`} />
          <KpiTile label="Gates High Congestion" value={kpis.high_congestion_gates} />
          <KpiTile label="Active Incidents" value={kpis.active_incidents} />
          <KpiTile label="Concessions Sales" value={`$${(kpis.concession_sales / 1000).toFixed(0)}K`} />
          <KpiTile label="Avg Order → Pickup" value={`${kpis.avg_order_pickup_time.toFixed(1)} min`} />
          <KpiTile label="Staff On Duty" value={kpis.active_staff} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16 }}>
          {/* “Map” area */}
          <div style={{ borderRadius: 12, border: "1px solid #262626", padding: 16, background: "#0b0d10" }}>
            <div style={{ borderRadius: 12, border: "1px solid #262626", padding: 16, background: "#0b0d10" }}>
            <h3 style={{ margin: 0, marginBottom: 4 }}>Stadium Overview</h3>
            <p style={{ margin: 0, marginBottom: 12, fontSize: 12, color: "#9e9e9e" }}>
              Real‑time crowd density and gate status
            </p>
            <StadiumMap zones={zones} alerts={alerts} />
          </div>
            <p style={{ margin: 0, marginBottom: 12, fontSize: 12, color: "#9e9e9e" }}>
              Real‑time crowd density and gate status
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {zones.map((z) => (
                <ZoneCard key={z.id} zone={z} />
              ))}
            </div>
          </div>

          {/* Alerts list */}
          <div style={{ borderRadius: 12, border: "1px solid #262626", padding: 16, background: "#0b0d10" }}>
            <h3 style={{ margin: 0, marginBottom: 4 }}>Active Alerts</h3>
            <p style={{ margin: 0, marginBottom: 12, fontSize: 12, color: "#9e9e9e" }}>
              {kpis.active_incidents} active incidents
            </p>
            <div style={{ maxHeight: "70vh", overflowY: "auto" }}>
              {alerts.map((a) => (
                <AlertRow key={a.id} alert={a} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function KpiTile({ label, value }) {
  return (
    <div
      style={{
        flex: 1,
        background: "#1e1e1e",
        padding: 12,
        borderRadius: 8,
        border: "1px solid #333"
      }}
    >
      <div style={{ fontSize: 12, opacity: 0.7 }}>{label}</div>
      <div style={{ fontSize: 24, fontWeight: "bold" }}>{value}</div>
    </div>
  );
}

function ZoneCard({ zone }) {
  const colors = { green: "#4caf50", yellow: "#ffb300", red: "#e53935" };
  const color = colors[zone.density] || "#90a4ae";

  const isParking = zone.type === "parking";

  return (
    <div
      style={{
        minWidth: 140,
        background: "#1e1e1e",
        borderRadius: 8,
        padding: 8,
        border: "1px solid #333"
      }}
    >
      <div style={{ fontWeight: "bold", marginBottom: 4 }}>{zone.name}</div>
      {!isParking ? (
        <>
          <div style={{ fontSize: 12 }}>Devices: {zone.device_count}</div>
          <div style={{ fontSize: 12 }}>
            Density: <span style={{ color }}>{zone.density}</span>
          </div>
          <div style={{ fontSize: 12 }}>
            Wait: {zone.avg_wait_min ?? "-"} min
          </div>
        </>
      ) : (
        <>
          <div style={{ fontSize: 12 }}>
            Inbound/min: {zone.vehicles_inbound_per_min}
          </div>
          <div style={{ fontSize: 12 }}>
            Outbound/min: {zone.vehicles_outbound_per_min}
          </div>
        </>
      )}
    </div>
  );
}


const SEVERITY_CONFIG = {
  critical: { color: "#e53935", label: "CRITICAL" },
  warning: { color: "#ffb300", label: "WARNING" },
  info: { color: "#4ade80", label: "INFO" }
};

function timeAgo(dateString) {
  const diffMs = Date.now() - new Date(dateString).getTime();
  const diffMin = Math.max(0, Math.round(diffMs / 60000));
  if (diffMin < 1) return "just now";
  if (diffMin === 1) return "1 min ago";
  if (diffMin < 60) return `${diffMin} min ago`;
  const hrs = Math.round(diffMin / 60);
  return `${hrs} hr${hrs > 1 ? "s" : ""} ago`;
}

function AlertRow({ alert }) {
  const config = SEVERITY_CONFIG[alert.severity] || SEVERITY_CONFIG.info;

  return (
    <div
      style={{
        padding: "10px 12px",
        marginBottom: 8,
        borderRadius: 8,
        background: "#141416",
        borderLeft: `3px solid ${config.color}`
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#f5f5f5" }}>{alert.title}</div>
        <span
          style={{
            flexShrink: 0,
            fontSize: 10,
            fontWeight: 700,
            padding: "2px 6px",
            borderRadius: 999,
            background: `${config.color}26`,
            color: config.color,
            border: `1px solid ${config.color}66`
          }}
        >
          {config.label}
        </span>
      </div>
      <div style={{ fontSize: 11, color: "#9e9e9e", marginTop: 4 }}>
        {alert.location || alert.zone_id} · {timeAgo(alert.created_at)}
      </div>
    </div>
  );
}

