import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../css/modules/EventView.module.css";

const EventView = () => {
  const { id } = useParams();
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [joinStatus, setJoinStatus] = useState<string | null>(null);
  const [managementCode, setManagementCode] = useState("");
  const [manageStatus, setManageStatus] = useState<string | null>(null);
  const [personalAttendanceCode, setPersonalAttendanceCode] = useState("");
  const [cancelStatus, setCancelStatus] = useState<string | null>(null);
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
    const alreadyRegistered = event.attendances?.some(
        (a: any) =>
            a.attendeeEmail?.toLowerCase() === email.trim().toLowerCase()
        );

    if (alreadyRegistered) {
    alert("This email is already registered for this event.");
    setJoinStatus("This email is already registered for this event.");
    return;
    }
    if (event.attendeeCount >= event.maxParticipants) {
      alert("The event is full. You cannot join.");
      setJoinStatus("The event is full. You cannot join.");
      return;
    }
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
      const data = await res.json();
      setJoinStatus("You have joined the event!\n Your attendance code: " + data.attendanceCode);
      setName("");
      setEmail("");
      updateEventData();
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

  const handleCancel = async () => {  
    setCancelStatus(null);
    if (!personalAttendanceCode.trim()) {
      setCancelStatus("Please enter your attendance code.");
      return;
    }
    const res = await fetch(`http://localhost:4000/api/sessions/attendance/${personalAttendanceCode.trim()}`, {
      method: "DELETE",
    });
    if (res.ok) {
        setCancelStatus("Sorry to see you go! Your attendance has been cancelled.");
        updateEventData();  
    } else {
      setCancelStatus("Failed to cancel attendance. Please check your attendance code.");
    }
  }

  const updateEventData = async () => {
          const updatedRes = await fetch(`http://localhost:4000/api/sessions/${id}`);
      if (updatedRes.ok) {
        setEvent(await updatedRes.json());
      }
    };

  if (loading) return <div>Loading...</div>;
  if (!event) return <div>Event not found.</div>;

  return (
    <div className="card cheerful-card p-4" style={{ maxWidth: 600, margin: "2rem auto", border: "none" }}>
      <h2 className="card-title">{event.title}</h2>
      <p>{event.description}</p>
      <p>
        <strong>Date:</strong> {event.dateTime?.split("T")[0]}
      </p>
      <p>
        <strong>Time:</strong> {event.dateTime?.split("T")[1]?.slice(0, 5)}
      </p>
      <p>
        <strong>Participants:</strong> {event.attendeeCount ?? 0} / {event.maxParticipants}
      </p>
      <p>
        <strong>People going:</strong> { event.attendances.map((a:any) => a.attendeeName).join(", ") } 
      </p>
      <hr />
      <div>
        <h4>Join the event</h4>
        <div className="d-flex flex-row align-items-center">
        <label style={{marginRight: "2rem"}}>
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
        </div>
        <button className="btn cheerful-btn" onClick={handleJoin}>
          Join the event
        </button>
        {joinStatus && <div className="mt-2" style={{ whiteSpace: "pre-line" }}>{joinStatus}</div>}
      </div>
      <hr />
      <div>
        <h4>Cancel attendance</h4>
          <div>

          <input
            className="form-control my-2"
            type="text"
            value={personalAttendanceCode}
            onChange={e => setPersonalAttendanceCode(e.target.value)}
            placeholder="Your attendance code"
            />
            </div>
        <button className="btn btn-danger" onClick={handleCancel}>
          Cancel attendance
        </button>
        {cancelStatus && <div className="mt-2">{cancelStatus}</div>}    
      </div>
      <hr />
      <div>
        <h4>Manage the event</h4>
        <div>
        <input
        className="form-control my-2"
        type="text"
        placeholder="Management Code"
        value={managementCode}
        onChange={e => setManagementCode(e.target.value)}
        />
        </div>
        <button className="btn cheerful-btn" onClick={handleManage}>
        Manage Event
        </button>
        {manageStatus && <div className="mt-2">{manageStatus}</div>}
      </div>
    </div>
  );
};

export default EventView;