import React from "react";
import styles from "./TileItem.module.css";
import type { Event } from "../types/types";

const TileItem = (props: Event) => {
	return (
		<div className={styles.tile}>
			<h3>{props.title}</h3>
			<p>{props.description}</p>
			<p>Date: {props.date}</p>
			<p>Time: {props.time}</p>
			<p>
				Participants: {props.attendees}/{props.maxParticipants}
			</p>
			<p>This event is {props.isPrivate ? "private" : "public"}</p>
		</div>
	);
};

export default TileItem;
