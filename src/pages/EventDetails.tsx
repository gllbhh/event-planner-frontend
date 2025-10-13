import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState<any>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      const res = await fetch(`https://event-planner-api-d4g6g2acakabbfdu.northeurope-01.azurewebsites.net/api/sessions/${id}`);
      if (res.ok) {
        setEvent(await res.json());
      }
    };
    fetchEvent();
  }, [id]);

  if (!event) return <div>Loading...</div>;

  return (
    <div className="card cheerful-card p-4" style={{ maxWidth: 800, margin: "2rem auto", border: "none" }}>
      <h2>{event.title}</h2>
      <p><strong>Event ID:</strong> {event.id}</p>
      {event.managementCode && (
        <p>
          <strong>Management Code:</strong> <span style={{fontFamily: "monospace"}}>{event.managementCode}</span>
          <br />
          <small style={{color: "red"}}>Save this code! You will need it to edit or delete the event.</small>
        </p>
      )}
      <p>{event.description}</p>
      <p>
        <strong>Date:</strong> {event.dateTime?.split("T")[0]}
      </p>
      <p>
        <strong>Time:</strong> {event.dateTime?.split("T")[1]?.slice(0, 5)}
      </p>
      <p>
        <strong>Participants:</strong> {event.attendeeCount} / {event.maxParticipants}
      </p>
      <p>
        <strong>Private:</strong> {event.isPrivate ? "Yes" : "No"}
      </p>
    </div>
  );
};

export default EventDetails;