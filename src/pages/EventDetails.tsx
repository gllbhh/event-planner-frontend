import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState<any>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      const res = await fetch(`http://localhost:4000/api/sessions/${id}`);
      if (res.ok) {
        setEvent(await res.json());
      }
    };
    fetchEvent();
  }, [id]);

  if (!event) return <div>Loading...</div>;

  return (
    <div>
      <h2>{event.title}</h2>
      <p>{event.description}</p>
      <p>
        <strong>Date:</strong> {event.dateTime?.split("T")[0]}
      </p>
      <p>
        <strong>Time:</strong> {event.dateTime?.split("T")[1]?.slice(0, 5)}
      </p>
      <p>
        <strong>Max Participants:</strong> {event.maxParticipants}
      </p>
      <p>
        <strong>Private:</strong> {event.isPrivate ? "Yes" : "No"}
      </p>
      <p>
        <strong>Attendees:</strong> {event.attendees?.length ?? 0}
      </p>
    </div>
  );
};

export default EventDetails;