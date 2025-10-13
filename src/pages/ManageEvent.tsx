import React, { useEffect, useState } from "react";
import type { Event } from "../types/types";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import styles from "../css/modules/ManageEvent.module.css";
import AttendeeList from "../components/AttendeeList";

// Main component for managing (editing, deleting) an event
const ManageEvent = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  // Get event data and management code from navigation state
  const eventFromState = location.state?.event;
  const managementCode = location.state?.managementCode;

  // Parse event data from state for initial form values
  const parseEvent: Event = {
    id: eventFromState?.id || "",
    title: eventFromState?.title || "",
    description: eventFromState?.description || "",
    date: eventFromState?.dateTime?.split("T")[0] || "",
    time: eventFromState?.dateTime?.split("T")[1]?.slice(0, 5) || "",
    maxParticipants: eventFromState?.maxParticipants || 0,
    attendeeCount: eventFromState?.attendeeCount || 0,
    attendees: eventFromState?.attendances || [],
    attendeeNames: eventFromState?.attendeeNames || [],
    isPrivate: eventFromState?.isPrivate || false,
  };

  // Local state for the event/session being managed
  const [session, setSession] = useState<Event>(parseEvent);

  // Handles changes in form fields (input/textarea/checkbox)
  const updateSessionHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const fieldName = e.target.name;
    const fieldType = (e.target as HTMLInputElement).type;
    const fieldValue =
      fieldType === "checkbox"
        ? (e.target as HTMLInputElement).checked
        : fieldType === "number"
        ? Number(e.target.value)
        : e.target.value;
    setSession((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  // Save (update) the event details via PATCH request
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
        `https://event-planner-api-d4g6g2acakabbfdu.northeurope-01.azurewebsites.net/api/sessions/${session.id}?managementCode=${managementCode}`,
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
      // Navigate to event details page after successful update
      navigate(`/create/event/${data.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  // Delete the event after confirmation
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        const response = await fetch(
          `https://event-planner-api-d4g6g2acakabbfdu.northeurope-01.azurewebsites.net/api/sessions/${session.id}?managementCode=${managementCode}`,
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

  // Remove an attendee from the event after confirmation
  const removeAttendee = async (attendanceId: string) => {
    if (!attendanceId) return;
    const confirmed = window.confirm("Are you sure you want to remove this attendee?");
    if (!confirmed) return;
    try {
      const response = await fetch(
        `https://event-planner-api-d4g6g2acakabbfdu.northeurope-01.azurewebsites.net/api/sessions/${session.id}/attendance/${attendanceId}?managementCode=${managementCode}`,
        { method: "DELETE" }
      );
      if (response.ok) {
        alert("Attendee removed.");
        // Update local attendee list after removal
        setSession((prev) => ({
          ...prev,
          attendees: (prev.attendees ?? []).filter((a: any) => a.id !== attendanceId),
        }));
      } else {
        alert("Failed to remove attendee.");
      }
    } catch (error) {
      alert("Failed to remove attendee.");
    }
  };

  // Show loading state if event data is not ready
  if (!session.title && !session.description) return <div>Loading...</div>;

  return (
    <div
      className="card cheerful-card p-4"
      style={{ maxWidth: 800, margin: "2rem auto", border: "none" }}
    >
      <h1>Manage Event</h1>
      {/* Title input */}
      <input
        className="form-control"
        placeholder="Title"
        name="title"
        onChange={updateSessionHandler}
        value={session.title}
      />
      {/* Description textarea */}
      <textarea
        className={`form-control ${styles.descriptionBox}`}
        placeholder="Description"
        name="description"
        onChange={updateSessionHandler}
        value={session.description}
      />
      {/* Max participants input */}
      <input
        className="form-control"
        placeholder="Maximum Participants"
        type="number"
        name="maxParticipants"
        onChange={updateSessionHandler}
        value={session.maxParticipants}
      />
      {/* Date input */}
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
      {/* Time input */}
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
      {/* Privacy switch */}
      <div className="form-check form-switch mb-3">
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
      {/* Participants count */}
      <div>
        <h4>Participants</h4>
        <p>
          {session.attendeeCount ?? 0} / {session.maxParticipants}
        </p>
      </div>
      {/* Attendee list with remove functionality */}
      <div>
        <AttendeeList attendees={session.attendees || []} handleDelete={removeAttendee} />
      </div>
      {/* Update and Delete buttons */}
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