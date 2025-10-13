// src/scripts/injectDummyData.cjs
const dummyData = require("../data/dummyData.json");
const API_URL = process.env.API_URL ?? "https://event-planner-api-d4g6g2acakabbfdu.northeurope-01.azurewebsites.net/api/sessions";

function toIsoDateTime(e) {
  const dt = e?.dateTime;
  if (dt && typeof dt === "object" && dt.date && dt.time) {
    const d = new Date(`${dt.date}T${dt.time}`);
    return isNaN(d) ? null : d.toISOString();
  }
  if (typeof dt === "string") {
    const d = new Date(dt);
    return isNaN(d) ? null : d.toISOString();
  }
  return null;
}

(async function seed() {
  for (const e of dummyData) {
    const dateTime = toIsoDateTime(e);
    if (!dateTime) { console.error(`Skipping "${e.title}": bad/missing dateTime`); continue; }
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: e.title,
        description: e.description,
        dateTime,
        maxParticipants: Number(e.maxParticipants) || 0,
        isPrivate: !!e.isPrivate,
      }),
    });
    if (!res.ok) console.error(`Failed "${e.title}": ${res.status} ${await res.text()}`);
    else console.log(`Inserted: ${e.title}`);
  }
})();
