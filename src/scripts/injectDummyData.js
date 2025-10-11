import fetch from "node-fetch"; // npm install node-fetch
import { dummyData } from "../data/dummyData.js"; // Note the .js extension

const API_URL = "http://localhost:4000/api/sessions";

async function seed() {
  for (const event of dummyData) {
    const dateTime = new Date(`${event.date}T${event.time}`).toISOString();
    const payload = {
      title: event.title,
      description: event.description,
      dateTime,
      maxParticipants: event.maxParticipants,
      isPrivate: event.isPrivate,
    };
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        console.error(`Failed to insert: ${event.title}`, await res.text());
      } else {
        console.log(`Inserted: ${event.title}`);
      }
    } catch (err) {
      console.error(`Error inserting: ${event.title}`, err);
    }
  }
}

seed();