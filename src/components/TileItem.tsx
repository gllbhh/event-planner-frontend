import React from "react";
import styles from "../css/modules/TileItem.module.css";
import type { Event } from "../types/types";
import { useNavigate } from "react-router-dom";

// TileItem component displays a single event as a clickable card
const TileItem = (props: Event) => {
    const navigate = useNavigate(); // Hook for navigation

    // Handles click on the card to navigate to the event's detail page
    const handleClick = () => {
        navigate(`/event/${props.id}`);
    };

    return (
        <div
            className={`card cheerful-card shadow-lg ${styles.tile} d-flex flex-column align-items-start justify-content-between`}
            onClick={handleClick}
            style={{ cursor: "pointer" }}
        >
            <div className="card-body w-100">
                {/* Event title */}
                <h3 className="card-title">{props.title}</h3>
                {/* Event description, truncated if too long */}
                <p className={`card-text fst-italic ${styles.truncateDesc}`}>{props.description}</p>
                {/* Event date */}
                <p>Date: {props.date}</p>
                {/* Event time */}
                <p>Time: {props.time}</p>
                {/* Number of participants */}
                <p>
                    Participants: {props.attendeeCount || 0}/{props.maxParticipants}
                </p>
                {/* Event privacy status */}
                <p>This event is {props.isPrivate ? "private" : "public"}</p>
            </div>
        </div>
    );
};

export default TileItem;
