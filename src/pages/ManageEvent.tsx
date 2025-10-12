import React, { useEffect, useState } from "react";
import type { Event } from "../types/types";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const ManageEvent = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const eventFromState = location.state?.event;
  const managementCode = location.state?.managementCode;
  console.log("Event from state:", eventFromState);
  console.log("Management code from state:", managementCode);
  
  const parseEvent: Event = {
      id: eventFromState?.id || 0,
      title: eventFromState?.title || "",
      description: eventFromState?.description || "",
      date: eventFromState?.dateTime?.split("T")[0] || "",
      time: eventFromState?.dateTime?.split("T")[1]?.slice(0, 5) || "",
      maxParticipants: eventFromState?.maxParticipants || 0,
      isPrivate: eventFromState?.isPrivate || false, 
    }
    
    const [session, setSession] = useState<Event>(parseEvent);
    console.log("Event from page:", session);
    
    const updateSessionHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name;
    const fieldType = e.target.type;
    const fieldValue =
      fieldType === "checkbox"
        ? e.target.checked
        : fieldType === "number"
        ? Number(e.target.value)
        : e.target.value;
    setSession((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  const saveSession = async () => {
    try {
      const dateTime =
        session.date && session.time
          ? new Date(`${session.date}T${session.time}`).toISOString()
          : "";

      const payload = {
        title: session.title,
        description: session.description,
        dateTime,
        maxParticipants: session.maxParticipants,
        isPrivate: session.isPrivate,
      };

      const response = await fetch(
        `http://localhost:4000/api/sessions/${session.id}?managementCode=${managementCode}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      if (!response.ok) {
        alert("Failed to update event.");
        return;
      }
      const data = await response.json();
      navigate(`/event/${data.id}`);
    } catch (error) {
      console.error(error);
    }
  };

    const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        const response = await fetch(
          `http://localhost:4000/api/sessions/${session.id}?managementCode=${managementCode}`,
          { method: "DELETE" }
        );
        if (response.ok) {
          alert("Event deleted.");
          navigate("/");
        } else {
          alert("Failed to delete event.");
        }
      } catch (error) {
        alert("Failed to delete event.");
      }
    }
  };

  if (!session.title && !session.description) return <div>Loading...</div>;

  return (
    <div className="d-flex flex-column">
      <h1>Manage Event</h1>
      <input
        className="form-control"
        placeholder="Title"
        name="title"
        onChange={updateSessionHandler}
        value={session.title}
      />
      <input
        className="form-control"
        placeholder="Description"
        name="description"
        onChange={updateSessionHandler}
        value={session.description}
      />
      <input
        className="form-control"
        placeholder="Maximum Participants"
        type="number"
        name="maxParticipants"
        onChange={updateSessionHandler}
        value={session.maxParticipants}
      />
      <div className="mb-3">
        <label htmlFor="dateInput" className="form-label">
          Date
        </label>
        <input
          type="date"
          className="form-control"
          id="dateInput"
          name="date"
          onChange={updateSessionHandler}
          value={session.date}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="timeInput" className="form-label">
          Time
        </label>
        <input
          type="time"
          className="form-control"
          id="timeInput"
          step="60"
          name="time"
          onChange={updateSessionHandler}
          value={session.time}
        />
      </div>

      <div className="form-check form-switch">
        <label className="form-check-label" htmlFor="switchCheckDefault">
          {session.isPrivate ? "Private" : "Public"}
        </label>
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          id="switchCheckDefault"
          name="isPrivate"
          checked={session.isPrivate}
          onChange={updateSessionHandler}
        />
      </div>

      <button type="button" className="btn btn-primary" onClick={saveSession}>
        Update Event
      </button>
            <button
        type="button"
        className="btn btn-danger mt-3"
        onClick={handleDelete}
      >
        Delete Event
      </button>
    </div>
  );
};

export default ManageEvent;