const { zones, kpis, incidents, weather, incidentTemplates } = require("./data/state");

function randomDelta(max = 10) {
  return Math.floor(Math.random() * (2 * max + 1)) - max;
}

let next_incident_id = 1;

function maybeGenerateIncident() {
  // Roll separately for each tier so info-level events show up more often
  // than warnings, and warnings more often than critical
  const roll = Math.random();
  let severity;
  if (roll < 0.03) severity = "critical";
  else if (roll < 0.10) severity = "warning";
  else if (roll < 0.20) severity = "info";
  else return; // nothing happens this tick

  const pool = incidentTemplates[severity];
  const template = pool[Math.floor(Math.random() * pool.length)];

  const zone_list = Object.values(zones);
  const random_zone = zone_list[Math.floor(Math.random() * zone_list.length)];

  incidents.push({
    id: next_incident_id++,
    severity,               // "critical" | "warning" | "info"
    type: template.type,
    icon: template.icon,
    title: template.title,
    zone_id: random_zone.id,
    location: random_zone.name,
    created_at: new Date().toISOString(),
    status: "active",
  });

  if (incidents.length > 30) incidents.shift();

  kpis.active_incidents = incidents.filter((i) => i.status === "active").length;
  kpis.critical_incidents = incidents.filter(
    (i) => i.status === "active" && i.severity === "critical"
  ).length;
}


function simulatedZoneUpdates() {
  let stadium_total = 0;
  let gate_wait_sum = 0;
  let gate_count = 0;
  let gates_high_congestion = 0;

  Object.values(zones).forEach((z) => {
    if (["gate", "concourse", "section"].includes(z.type)) {
      z.device_count = Math.max(0, z.device_count + randomDelta());

      if (z.device_count < 200) {
        z.density = "green";
        z.avg_wait_min = 2;
      } else if (z.device_count < 400) {
        z.density = "yellow";
        z.avg_wait_min = 5;
      } else {
        z.density = "red";
        z.avg_wait_min = 10;
        if (z.type === "gate") gates_high_congestion++;
      }

      stadium_total += z.device_count;
      if (z.type === "gate") {
        gate_wait_sum += z.avg_wait_min;
        gate_count++;
      }
    }

    if (z.type === "parking") {
      z.vehicles_inbound_per_min = Math.max(
        0,
        (z.vehicles_inbound_per_min || 10) + randomDelta(3)
      );
      z.vehicles_outbound_per_min = Math.max(
        0,
        (z.vehicles_outbound_per_min || 5) + randomDelta(2)
      );
    }
  });

  kpis.total_in_stadium = stadium_total;
  kpis.high_congestion_gates = gates_high_congestion;
  kpis.avg_gate_wait_time = gate_count ? gate_wait_sum / gate_count : 0;
  kpis.concession_sales += Math.floor(Math.random() * 500);
}

let next_incident_id = 1;
function maybeGenerateIncident() {
  if (Math.random() < 0.05) {
    const zone_list = Object.values(zones).filter((z) =>
      ["gate", "concourse"].includes(z.type)
    );
    const random_zone = zone_list[Math.floor(Math.random() * zone_list.length)];
    const types = ["medical", "security", "obstruction"];
    const type = types[Math.floor(Math.random() * types.length)];
    const severity = Math.random() > 0.5 ? "yellow" : "red";

    incidents.push({
      id: next_incident_id++,
      type,
      zone_id: random_zone.id,
      severity,
      created_at: new Date().toISOString(),
      status: "active"
    });
  }

  if (incidents.length > 20) incidents.shift();
  kpis.active_incidents = incidents.filter((i) => i.status === "active").length;
}

function updateWeather() {
  weather.temperature_f += randomDelta(1);
  if (Math.random() < 0.01) {
    weather.storm_alert =
      weather.storm_alert === "none" ? "watch" : "warning";
  }
}

function stepSimulation() {
  simulatedZoneUpdates();
  updateWeather();
  maybeGenerateIncident();
}

function startSimulation(interval_ms = 5000) {
  setInterval(stepSimulation, interval_ms);
}

module.exports = { startSimulation };
