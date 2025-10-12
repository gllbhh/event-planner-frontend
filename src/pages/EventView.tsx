import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EventView = () => {
  const { id } = useParams();
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [joinStatus, setJoinStatus] = useState<string | null>(null);
  const [managementCode, setManagementCode] = useState("");
  const [manageStatus, setManageStatus] = useState<string | null>(null);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchEvent = async () => {
      const res = await fetch(`http://localhost:4000/api/sessions/${id}`);
      if (res.ok) {
        console.log("Fetched event:", await res.clone().json());
        setEvent(await res.json());
      }
      setLoading(false);
    };
    fetchEvent();
  }, [id]);

  const handleJoin = async () => {
    setJoinStatus(null);
    if (!name.trim() || !email.trim()) {
      setJoinStatus("Please enter your name and email.");
      return;
    }
    const res = await fetch(`http://localhost:4000/api/sessions/${id}/attend`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ attendeeName: name, attendeeEmail: email }),
    });
    if (res.ok) {
      setJoinStatus("You have joined the event!");
      setName("");
      setEmail("");
      console.log("Joined event:", await res.json());
      // Refresh event data to show updated attendees count
      const updatedRes = await fetch(`http://localhost:4000/api/sessions/${id}`);
      if (updatedRes.ok) {
        setEvent(await updatedRes.json());
      }
    } else {
      setJoinStatus("Failed to join the event.");
    }
  };

  const handleManage = () => {
    if (event.managementCode === managementCode.trim()) {
        setManageStatus("Management code accepted!");
        navigate(`/manage?eventId=${id}&managementCode=${managementCode.trim()}`, { state: { event, managementCode: managementCode.trim() } });
    } else {
        setManageStatus("Invalid management code.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!event) return <div>Event not found.</div>;

  return (
    <div className="card cheerful-card p-4" style={{ maxWidth: 500, margin: "2rem auto" }}>
      <h2 className="card-title">{event.title}</h2>
      <p>{event.description}</p>
      <p>
        <strong>Date:</strong> {event.dateTime?.split("T")[0]}
      </p>
      <p>
        <strong>Time:</strong> {event.dateTime?.split("T")[1]?.slice(0, 5)}
      </p>
      <p>
        <strong>Participants:</strong> {event.attendees?.length ?? 0} / {event.maxParticipants}
      </p>
      <hr />
      <div>
        <label>
          Name:
          <input
            className="form-control my-2"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Your name"
          />
        </label>
        <label>
          Email:
          <input
            className="form-control my-2"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Your email"
          />
        </label>
        <button className="btn cheerful-btn mt-2" onClick={handleJoin}>
          Join the event
        </button>
        {joinStatus && <div className="mt-2">{joinStatus}</div>}
      </div>
      <div>
        <input
        className="form-control my-2"
        type="text"
        placeholder="Management Code"
        value={managementCode}
        onChange={e => setManagementCode(e.target.value)}
      />
      <button className="btn cheerful-btn" onClick={handleManage}>
        Manage Event
      </button>
      {manageStatus && <div className="mt-2">{manageStatus}</div>}
      </div>
    </div>
  );
};

export default EventView;