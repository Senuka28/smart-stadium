const express = require("express");
const cors = require("cors");
const { zones, kpis, incidents, weather } = require("./data/state");
const { startSimulation } = require("./simulator");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/kpis", (req, res) => {
  res.json({ ...kpis, weather });
});

app.get("/api/zones", (req, res) => {
  res.json(Object.values(zones));
});

app.get("/api/alerts", (req, res) => {
  res.json(incidents.slice().reverse());
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
  startSimulation();
});

app.post("/api/report-incident", (req, res) => {
  const { zone_id, type, description } = req.body;

  if (!zone_id || !type || !description) {
    return res.status(400).json({ error: "zone_id, type, and description are required" });
  }

  const zone = zones[zone_id];

  const newIncident = {
    id: Date.now(),
    severity: "warning",
    type,
    title: `Fan-reported: ${type}`,
    description,
    zone_id,
    location: zone ? zone.name : zone_id,
    created_at: new Date().toISOString(),
    status: "active",
    source: "fan_report"
  };

  incidents.push(newIncident);
  if (incidents.length > 30) incidents.shift();

  kpis.active_incidents = incidents.filter((i) => i.status === "active").length;

  res.status(201).json(newIncident);
});
