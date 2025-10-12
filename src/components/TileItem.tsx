import React from "react";
import styles from "../css/modules/TileItem.module.css";
import type { Event } from "../types/types";

const TileItem = (props: Event) => {
    return (
        <div
            className={`card cheerful-card shadow-lg ${styles.tile} d-flex flex-column align-items-start justify-content-between`}
        >
            <div className="card-body w-100">
                <h3 className="card-title">{props.title}</h3>
                <p className={`card-text fst-italic ${styles.truncateDesc}`}>{props.description}</p>
                <p>Date: {props.date}</p>
                <p>Time: {props.time}</p>
                <p>
                    Participants: {props.attendees}/{props.maxParticipants}
                </p>
                <p>This event is {props.isPrivate ? "private" : "public"}</p>
				</div>
        </div>
    );
};

export default TileItem;
