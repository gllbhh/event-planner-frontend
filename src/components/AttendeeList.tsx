import React from "react";
import Attendee from "./Attendee";

import type { AttendeeType } from "../types/types";

type AttenddeListProps = {
    attendees: AttendeeType[];
    handleDelete: (id: string) => void;
}

const AttendeeList = ({ attendees, handleDelete}: AttenddeListProps) => {
    return (
        <>
        {attendees.map((attendee) => (
            <Attendee key={attendee.id} attendee={attendee} handleDelete={handleDelete} />
        ))}
        </>
    );
}

export default AttendeeList;