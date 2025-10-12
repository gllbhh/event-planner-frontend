import React from "react";
import type { AttendeeType } from "../types/types";

interface AttendeeProps {
   attendee: AttendeeType;
   handleDelete: (id: string) => void;
}
const Attendee = ({ attendee, handleDelete}: AttendeeProps) => {
    const spanStyle = { marginRight: "5px", marginTop: "5px", backgroundColor: "var(--accent1)", padding: "2px", borderRadius: "6px" };

  return (
      <span style={spanStyle}>{attendee.attendeeName}({attendee.attendeeEmail})
      <span onClick={() => handleDelete(attendee.id)} style={{ cursor: "pointer", marginLeft: "0.5em" }} title="Remove">x</span>
      </span>
  );
}

export default Attendee;