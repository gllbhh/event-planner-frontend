import React, {useEffect, useState} from "react";
import TileItem from "../components/TileItem";
import styles from "./TileView.module.css";
// import { dummyData } from "../data/dummyData.js";

const TileView = () => {
	// useState variable to hold events
	const [events, setEvents] = useState([]);

	// useEffect to fetch events from backend on component mount
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch("http://localhost:4000/api/sessions"); // Update URL to your backend
                if (!response.ok) throw new Error("Failed to fetch events");
                const data = await response.json();
                setEvents(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchEvents();
    }, []);

	    const eventTiles = events.map((e: any) => (
        <TileItem
            title={e.title}
            description={e.description}
            date={e.dateTime ? e.dateTime.split("T")[0] : ""}
            time={e.dateTime ? e.dateTime.split("T")[1]?.slice(0, 5) : ""}
            maxParticipants={e.maxParticipants}
            isPrivate={e.isPrivate}
            attendees={e.attendees}
            key={e.id}
        />
    ));
	// dummy data mapping
	// const events = dummyData.map((e) => (
	// 	<TileItem
	// 		title={e.title}
	// 		description={e.description}
	// 		date={e.date}
	// 		time={e.time}
	// 		maxParticipants={e.maxParticipants}
	// 		isPrivate={e.isPrivate}
	// 		attendees={e.attendees}
	// 		key={e.id}
	// 	/>
	// ));
	return (
		<>
			<div className={styles.tileView}>{eventTiles}</div>
		</>
	);
};

export default TileView;
