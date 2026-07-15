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
