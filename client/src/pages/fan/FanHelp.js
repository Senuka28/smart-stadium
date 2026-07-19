import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";

const API_BASE = "http://localhost:4000/api";

const LANGUAGES = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "pt", label: "Português", flag: "🇧🇷" },
];

const ZONE_OPTIONS = [
  "Gate1", "Gate2", "Gate3", "Gate4", "Gate5",
  "Gate6", "Gate7", "Gate8", "Gate9", "Gate10",
  "ConcourseN", "ConcourseE", "ConcourseS", "ConcourseW",
  "LotA", "LotB"
];

const INCIDENT_TYPES = [
  { value: "medical", label: "Medical" },
  { value: "security", label: "Security concern" },
  { value: "obstruction", label: "Obstruction / blocked path" },
  { value: "crowding", label: "Overcrowding" },
  { value: "facility", label: "Facility issue (restroom, spill, etc.)" },
  { value: "other", label: "Other" }
];

export default function FanHelp() {
  const { language, setLanguage, t } = useLanguage();

  const [zone, setZone] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const canSubmit = zone && type && description.trim().length > 0;

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch(`${API_BASE}/report-incident`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ zone_id: zone, type, description })
      });

      if (!res.ok) throw new Error("Failed to submit report");

      setSubmitted(true);
      setZone("");
      setType("");
      setDescription("");
    } catch (err) {
      setError("Couldn't send your report. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ padding: 16 }}>
      {/* --- Language toggle --- */}
      <h2 style={{ margin: 0, marginBottom: 16 }}>{t("selectLanguage")}</h2>
      {LANGUAGES.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code)}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "12px 14px",
            marginBottom: 8,
            borderRadius: 10,
            border: language === lang.code ? "1px solid #4ade80" : "1px solid #333",
            background: language === lang.code ? "#4ade8020" : "#1e1e1e",
            color: "#f5f5f5",
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
            textAlign: "left"
          }}
        >
          <span style={{ fontSize: 18 }}>{lang.flag}</span>
          {lang.label}
          {language === lang.code && <span style={{ marginLeft: "auto", color: "#4ade80" }}>✓</span>}
        </button>
      ))}

      <div style={{ height: 1, background: "#262626", margin: "24px 0" }} />

      {/* --- Incident report --- */}
      <h2 style={{ margin: 0, marginBottom: 4 }}>{t("reportIncident")}</h2>
      <p style={{ margin: 0, marginBottom: 16, fontSize: 12, color: "#9e9e9e" }}>
        {t("reportIncidentDesc")}
      </p>

      {submitted ? (
        <div
          style={{
            background: "#4ade8020",
            border: "1px solid #4ade8066",
            borderRadius: 10,
            padding: 16,
            marginBottom: 16
          }}
        >
          <div style={{ fontSize: 13, color: "#4ade80", fontWeight: 600, marginBottom: 8 }}>
            ✓ {t("reportSubmitted")}
          </div>
          <button
            onClick={() => setSubmitted(false)}
            style={{
              background: "none",
              border: "none",
              color: "#9e9e9e",
              fontSize: 12,
              textDecoration: "underline",
              cursor: "pointer",
              padding: 0
            }}
          >
            Report another incident
          </button>
        </div>
      ) : (
        <div style={{ background: "#141416", borderRadius: 10, padding: 16, border: "1px solid #262626" }}>
          <label style={{ fontSize: 12, color: "#9e9e9e", display: "block", marginBottom: 6 }}>
            {t("selectZone")}
          </label>
          <select
            value={zone}
            onChange={(e) => setZone(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: 8,
              border: "1px solid #333",
              background: "#1e1e1e",
              color: "#f5f5f5",
              fontSize: 13,
              marginBottom: 14
            }}
          >
            <option value="">{t("chooseOption")}</option>
            {ZONE_OPTIONS.map((z) => (
              <option key={z} value={z}>{z}</option>
            ))}
          </select>

          <label style={{ fontSize: 12, color: "#9e9e9e", display: "block", marginBottom: 6 }}>
            {t("incidentType")}
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: 8,
              border: "1px solid #333",
              background: "#1e1e1e",
              color: "#f5f5f5",
              fontSize: 13,
              marginBottom: 14
            }}
          >
            <option value="">{t("chooseOption")}</option>
            {INCIDENT_TYPES.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>

          <label style={{ fontSize: 12, color: "#9e9e9e", display: "block", marginBottom: 6 }}>
            {t("descriptionLabel")}
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={t("descriptionPlaceholder")}
            rows={4}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: 8,
              border: "1px solid #333",
              background: "#1e1e1e",
              color: "#f5f5f5",
              fontSize: 13,
              marginBottom: 14,
              resize: "vertical",
              fontFamily: "inherit"
            }}
          />

          {error && (
            <div style={{ fontSize: 12, color: "#e53935", marginBottom: 12 }}>{error}</div>
          )}

          <button
            disabled={!canSubmit || submitting}
            onClick={handleSubmit}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: 10,
              border: "none",
              background: canSubmit && !submitting ? "#4ade80" : "#333",
              color: canSubmit && !submitting ? "#0b0d10" : "#777",
              fontSize: 14,
              fontWeight: 700,
              cursor: canSubmit && !submitting ? "pointer" : "not-allowed"
            }}
          >
            {submitting ? "Sending..." : t("submitReport")}
          </button>
        </div>
      )}
    </div>
  );
}