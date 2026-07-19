import { useLanguage } from "../../context/LanguageContext";

const LANGUAGES = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "pt", label: "Português", flag: "🇧🇷" },
];

export default function FanLanguage() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div style={{ padding: 16 }}>
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
            padding: "14px",
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
          <span style={{ fontSize: 20 }}>{lang.flag}</span>
          {lang.label}
          {language === lang.code && <span style={{ marginLeft: "auto", color: "#4ade80" }}>✓</span>}
        </button>
      ))}
    </div>
  );
}