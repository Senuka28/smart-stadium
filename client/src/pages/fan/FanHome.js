import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";

const MATCHES = [
  { id: 1, stage: "Final", home: "Spain", away: "Argentina", homeScore: 0, awayScore: 0, status: "UPCOMIG", kickoff: "3:00PM"},
  { id: 2, stage: "Semifinal", home: "Spain", away: "France", homeScore: 2, awayScore: 0, status: "FT" },
  { id: 3, stage: "Semifinal", home: "Argentina", away: "England", homeScore: 2, awayScore: 1, status: "LIVE", minute: "90+2" },
  { id: 4, stage: "Group Stage", home: "Spain", away: "Portugal", homeScore: 0, awayScore: 0, status: "FT", kickoff: "3:00 PM" },
  { id: 5, stage: "Group Stage", home: "England", away: "USA", homeScore: 3, awayScore: 0, status: "FT" },
  { id: 6, stage: "Group Stage", home: "Japan", away: "Morocco", homeScore: null, awayScore: null, status: "FT", kickoff: "6:00 PM" },
];

function StatusBadge({ status, minute }) {
  const config = {
    LIVE: { color: "#e53935", label: minute ? `${minute}'` : "LIVE" },
    FT: { color: "#9e9e9e", label: "FT" },
    UPCOMING: { color: "#4ade80", label: "UPCOMING" }
  };
  const c = config[status] || config.UPCOMING;
  return (
    <span
      style={{
        fontSize: 10,
        fontWeight: 700,
        padding: "2px 8px",
        borderRadius: 999,
        background: `${c.color}26`,
        color: c.color,
        border: `1px solid ${c.color}66`
      }}
    >
      {c.label}
    </span>
  );
}

function MatchRow({ match }) {
  const hasScore = match.homeScore !== null;
  return (
    <div
      style={{
        background: "#141416",
        borderRadius: 10,
        padding: "12px 14px",
        marginBottom: 10,
        border: "1px solid #262626"
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <span style={{ fontSize: 11, color: "#9e9e9e" }}>{match.stage}</span>
        <StatusBadge status={match.status} minute={match.minute} />
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 14, fontWeight: 600 }}>{match.home}</div>
        <div style={{ fontSize: 16, fontWeight: 700 }}>
          {hasScore ? match.homeScore : "-"}
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 4 }}>
        <div style={{ fontSize: 14, fontWeight: 600 }}>{match.away}</div>
        <div style={{ fontSize: 16, fontWeight: 700 }}>
          {hasScore ? match.awayScore : "-"}
        </div>
      </div>

      {match.status === "UPCOMING" && (
        <div style={{ fontSize: 11, color: "#9e9e9e", marginTop: 8 }}>Kickoff: {match.kickoff}</div>
      )}
    </div>
  );
}

export default function FanHome() {
  const [matches] = useState(MATCHES);
  const { t } = useLanguage();

  return (
    <div style={{ padding: 16 }}>
      <h2 style={{ margin: 0, marginBottom: 4 }}>{t("scores")}</h2>
      <p style={{ margin: 0, marginBottom: 16, fontSize: 12, color: "#9e9e9e" }}>
        {t("liveUpcoming")}
      </p>

      {matches.map((m) => (
        <MatchRow key={m.id} match={m} />
      ))}

      <button
        onClick={() => alert("Open rulebook — wire this up to a real page or PDF")}
        style={{
          width: "100%",
          marginTop: 12,
          padding: "14px",
          borderRadius: 10,
          border: "1px solid #333",
          background: "#1e1e1e",
          color: "#4ade80",
          fontSize: 14,
          fontWeight: 600,
          cursor: "pointer"
        }}
      >
        📖 {t("rulebook")}
      </button>
    </div>
  );
}