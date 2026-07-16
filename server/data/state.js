const zones = {
  // Gates – moderate to high arrivals near event start
  Gate1:  { id: "Gate1",  type: "gate", name: "Gate 1",  device_count: 320, density: "yellow" },
  Gate2:  { id: "Gate2",  type: "gate", name: "Gate 2",  device_count: 280, density: "yellow" },
  Gate3:  { id: "Gate3",  type: "gate", name: "Gate 3",  device_count: 410, density: "red"    },
  Gate4:  { id: "Gate4",  type: "gate", name: "Gate 4",  device_count: 350, density: "yellow" },
  Gate5:  { id: "Gate5",  type: "gate", name: "Gate 5",  device_count: 260, density: "yellow" },
  Gate6:  { id: "Gate6",  type: "gate", name: "Gate 6",  device_count: 190, density: "green"  },
  Gate7:  { id: "Gate7",  type: "gate", name: "Gate 7",  device_count: 220, density: "yellow" },
  Gate8:  { id: "Gate8",  type: "gate", name: "Gate 8",  device_count: 300, density: "yellow" },
  Gate9:  { id: "Gate9",  type: "gate", name: "Gate 9",  device_count: 270, density: "yellow" },
  Gate10: { id: "Gate10", type: "gate", name: "Gate 10", device_count: 180, density: "green"  },

  // Concourse areas – heavier ongoing crowd
  ConcourseN: { id: "ConcourseN", type: "concourse", name: "Concourse North", device_count: 800, density: "yellow" },
  ConcourseE: { id: "ConcourseE", type: "concourse", name: "Concourse East",  device_count: 950, density: "red"    },
  ConcourseS: { id: "ConcourseS", type: "concourse", name: "Concourse South", device_count: 700, density: "yellow" },
  ConcourseW: { id: "ConcourseW", type: "concourse", name: "Concourse West",  device_count: 650, density: "yellow" },

  // Parking lots – cars per minute at a busy time window
  LotA: {
    id: "LotA",
    type: "parking lot",
    name: "Lot A",
    vehicles_inbound_per_min: 85,
    vehicles_outbound_per_min: 10
  },
  LotB: {
    id: "LotB",
    type: "parking lot",
    name: "Lot B",
    vehicles_inbound_per_min: 60,
    vehicles_outbound_per_min: 8
  }
};

let kpis = {
    total_in_stadium: 0,
    avg_gate_wait_time: 0,
    high_congestion_gates: 0,
    active_incidents: 0,
    concession_sales: 100000,
    avg_order_pickup_time: 4.5,
    active_staff: 200
};

let incidents = [];

const incidentTemplates = {
    critical: [
    { type: "medical", title: "Medical incident reported" },
    { type: "security", title: "Security incident reported" },
    { type: "queue", title: "Gate predicted to exceed safe queue length in 10 min" },
    { type: "fire", title: "Fire alarm triggered" },
  ],
  warning: [
    { type: "obstruction", title: "Obstruction reported" },
    { type: "crowd", title: "Concourse approaching crowd limit" },
    { type: "inventory", title: "Low inventory alert" },
    { type: "equipment", title: "Gate scanner malfunction" },
  ],
  info: [
    { type: "cleaning", title: "Restroom cleaning in progress" },
    { type: "restock", title: "Concession stand restocked" },
    { type: "shift", title: "Staff shift change completed" },
    { type: "system", title: "System health check passed" },
  ],
};

let weather = {
    temperatureF: 77,
    precipitation: 0,
    storm_alert: "none"
};

module.exports = {zones, kpis, incidents, weather, };