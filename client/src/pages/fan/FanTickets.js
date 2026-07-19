import { useState } from "react";

const STEPS = [
  "Select your seat section",
  "Confirm event details and pricing",
  "Review data collection & privacy consent",
  "Complete purchase and receive your digital ticket"
];

function generateBarcodeLines() {
  // Deterministic-looking fake barcode pattern
  const widths = [2, 4, 1, 3, 2, 5, 1, 2, 4, 3, 1, 2, 5, 2, 3, 1, 4, 2, 1, 3];
  return widths;
}

export default function FanTickets() {
  const [stage, setStage] = useState("intro"); // intro -> steps -> consent -> confirmed
  const [dataConsent, setDataConsent] = useState(false);
  const [privacyConsent, setPrivacyConsent] = useState(false);

  const canPurchase = dataConsent && privacyConsent;

  const ticket = {
    seat: "Section 132, Row F, Seat 14",
    gate: "Gate 3",
    event: "Championship Game",
    date: "Sat, Jul 25 · Gates Open 4:00 PM",
    ticketId: "WC-2026-84213-C"
  };

  const barcodeLines = generateBarcodeLines();

  // ---- STAGE: INTRO ----
  if (stage === "intro") {
    return (
      <div style={{ padding: 16 }}>
        <h2 style={{ margin: 0, marginBottom: 4 }}>My Seat</h2>
        <p style={{ margin: 0, marginBottom: 24, fontSize: 12, color: "#9e9e9e" }}>
          You don't have a ticket yet
        </p>

        <div
          style={{
            background: "#141416",
            borderRadius: 12,
            padding: 20,
            textAlign: "center",
            border: "1px solid #262626",
            marginBottom: 16
          }}
        >
          <div style={{ fontSize: 40, marginBottom: 8 }}>🎟️</div>
          <div style={{ fontSize: 14, color: "#9e9e9e", marginBottom: 16 }}>
            Purchase a ticket to access your seat, gate info, and digital pass
          </div>
          <button
            onClick={() => setStage("steps")}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: 10,
              border: "none",
              background: "#4ade80",
              color: "#0b0d10",
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer"
            }}
          >
            Purchase Ticket
          </button>
        </div>
      </div>
    );
  }

  // ---- STAGE: STEPS ----
  if (stage === "steps") {
    return (
      <div style={{ padding: 16 }}>
        <h2 style={{ margin: 0, marginBottom: 16 }}>How It Works</h2>

        {STEPS.map((step, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "12px 14px",
              marginBottom: 10,
              borderRadius: 10,
              background: "#141416",
              border: "1px solid #262626"
            }}
          >
            <div
              style={{
                width: 26,
                height: 26,
                borderRadius: "50%",
                background: "#4ade8020",
                color: "#4ade80",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 12,
                fontWeight: 700,
                flexShrink: 0
              }}
            >
              {i + 1}
            </div>
            <div style={{ fontSize: 13 }}>{step}</div>
          </div>
        ))}

        <button
          onClick={() => setStage("consent")}
          style={{
            width: "100%",
            marginTop: 8,
            padding: "14px",
            borderRadius: 10,
            border: "none",
            background: "#4ade80",
            color: "#0b0d10",
            fontSize: 14,
            fontWeight: 700,
            cursor: "pointer"
          }}
        >
          Continue
        </button>
      </div>
    );
  }

  // ---- STAGE: CONSENT ----
  if (stage === "consent") {
    return (
      <div style={{ padding: 16 }}>
        <h2 style={{ margin: 0, marginBottom: 4 }}>Consent & Privacy</h2>
        <p style={{ margin: 0, marginBottom: 20, fontSize: 12, color: "#9e9e9e" }}>
          Please review and agree before completing your purchase
        </p>

        <div
          style={{
            background: "#141416",
            borderRadius: 10,
            padding: 16,
            border: "1px solid #262626",
            marginBottom: 12
          }}
        >
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>
            Stadium Sensor Data Collection
          </div>
          <div style={{ fontSize: 12, color: "#9e9e9e", lineHeight: 1.5, marginBottom: 12 }}>
            To improve crowd safety and wait times, the stadium uses sensors (cameras,
            Wi-Fi/Bluetooth beacons, gate scanners) to collect anonymized movement and
            occupancy data throughout your visit. This data helps manage congestion,
            emergency response, and concession/restroom availability. Data is
            aggregated and not linked to your personal identity outside of ticket
            validation at gates.
          </div>
          <label style={{ display: "flex", alignItems: "flex-start", gap: 8, cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={dataConsent}
              onChange={(e) => setDataConsent(e.target.checked)}
              style={{ marginTop: 2 }}
            />
            <span style={{ fontSize: 12 }}>
              I consent to anonymized data collection via stadium sensors during this event
            </span>
          </label>
        </div>

        <div
          style={{
            background: "#141416",
            borderRadius: 10,
            padding: 16,
            border: "1px solid #262626",
            marginBottom: 20
          }}
        >
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>
            Privacy & Safety Policy
          </div>
          <div style={{ fontSize: 12, color: "#9e9e9e", lineHeight: 1.5, marginBottom: 12 }}>
            By purchasing a ticket, you agree to the venue's terms of entry, including
            bag policy, prohibited items, and emergency evacuation procedures. Your
            ticket purchase information (name, seat, contact info) is used solely for
            entry validation, incident response, and event communications, and will not
            be sold to third parties.
          </div>
          <label style={{ display: "flex", alignItems: "flex-start", gap: 8, cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={privacyConsent}
              onChange={(e) => setPrivacyConsent(e.target.checked)}
              style={{ marginTop: 2 }}
            />
            <span style={{ fontSize: 12 }}>
              I have read and agree to the privacy policy and terms of entry
            </span>
          </label>
        </div>

        <button
          disabled={!canPurchase}
          onClick={() => setStage("confirmed")}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: 10,
            border: "none",
            background: canPurchase ? "#4ade80" : "#333",
            color: canPurchase ? "#0b0d10" : "#777",
            fontSize: 14,
            fontWeight: 700,
            cursor: canPurchase ? "pointer" : "not-allowed"
          }}
        >
          {canPurchase ? "Complete Purchase" : "Agree to Both to Continue"}
        </button>
      </div>
    );
  }

  // ---- STAGE: CONFIRMED (fake ticket) ----
  return (
    <div style={{ padding: 16 }}>
      <h2 style={{ margin: 0, marginBottom: 4 }}>Your Ticket</h2>
      <p style={{ margin: 0, marginBottom: 20, fontSize: 12, color: "#9e9e9e" }}>
        Scan this at any gate for entry
      </p>

      <div
        style={{
          background: "linear-gradient(160deg, #141416, #0b0d10)",
          borderRadius: 16,
          padding: 20,
          border: "1px solid #262626",
          textAlign: "center"
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "4px 10px",
            borderRadius: 999,
            background: "rgba(74, 222, 128, 0.15)",
            color: "#4ade80",
            fontSize: 11,
            fontWeight: 700,
            marginBottom: 16,
            border: "1px solid rgba(74,222,128,0.4)"
          }}
        >
          ● VALID TICKET
        </div>

        <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 2 }}>{ticket.event}</div>
        <div style={{ fontSize: 12, color: "#9e9e9e", marginBottom: 16 }}>{ticket.date}</div>

        {/* Fake QR code */}
        <div
          style={{
            width: 160,
            height: 160,
            margin: "0 auto 16px",
            background: "#fff",
            borderRadius: 8,
            display: "grid",
            gridTemplateColumns: "repeat(8, 1fr)",
            gridTemplateRows: "repeat(8, 1fr)",
            padding: 10,
            gap: 2
          }}
        >
          {Array.from({ length: 64 }).map((_, i) => (
            <div
              key={i}
              style={{
                background: (i * 7 + ticket.ticketId.length) % 3 === 0 ? "#0b0d10" : "transparent"
              }}
            />
          ))}
        </div>

        {/* Fake barcode */}
        <div style={{ display: "flex", justifyContent: "center", gap: 1, height: 40, marginBottom: 12 }}>
          {barcodeLines.map((w, i) => (
            <div key={i} style={{ width: w, background: "#fff", height: "100%" }} />
          ))}
        </div>
        <div style={{ fontSize: 11, color: "#9e9e9e", letterSpacing: 1, marginBottom: 20 }}>
          {ticket.ticketId}
        </div>

        <div style={{ borderTop: "1px dashed #333", paddingTop: 16, textAlign: "left" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 8 }}>
            <span style={{ color: "#9e9e9e" }}>Seat</span>
            <span style={{ fontWeight: 600 }}>{ticket.seat}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
            <span style={{ color: "#9e9e9e" }}>Entry Gate</span>
            <span style={{ fontWeight: 600 }}>{ticket.gate}</span>
          </div>
        </div>
      </div>

      <button
        onClick={() => {
          setStage("intro");
          setDataConsent(false);
          setPrivacyConsent(false);
        }}
        style={{
          width: "100%",
          marginTop: 16,
          padding: "12px",
          borderRadius: 10,
          border: "1px solid #333",
          background: "transparent",
          color: "#9e9e9e",
          fontSize: 12,
          cursor: "pointer"
        }}
      >
        Reset Demo
      </button>
    </div>
  );
}