import React from "react";
import TileItem from "../components/TileItem";
import styles from "./TileView.module.css";
import { dummyData } from "../data/dummyData";

const TileView = () => {
	const events = dummyData.map((e) => (
		<TileItem
			title={e.title}
			description={e.description}
			date={e.date}
			time={e.time}
			maxParticipants={e.maxParticipants}
			isPrivate={e.isPrivate}
			attendees={e.attendees}
			key={e.id}
		/>
	));
	return (
		<>
			<div className={styles.tileView}>{events}</div>
		</>
	);
};

export default TileView;
