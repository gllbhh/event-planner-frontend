import React, {useEffect, useState} from "react";
import TileItem from "../components/TileItem";
import styles from "../css/modules/TileView.module.css";
import { useNavigate } from "react-router-dom";
import type { Event } from "../types/types";


const TileView = () => {
	// useState variable to hold events
	const [events, setEvents] = useState([]);

	// useEffect to fetch events from backend on component mount
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch("https://event-planner-api-d4g6g2acakabbfdu.northeurope-01.azurewebsites.net/api/sessions"); // Update URL to your backend
                if (!response.ok) throw new Error("Failed to fetch events");
                const data = await response.json();
                setEvents(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchEvents();
    }, []);
   
    console.log("Events:", events);

    // Map events to TileItem components
	    const eventTiles = events.map((e: any) => (
        <TileItem
            title={e.title}
            description={e.description}
            date={e.dateTime ? e.dateTime.split("T")[0] : ""}
            time={e.dateTime ? e.dateTime.split("T")[1]?.slice(0, 5) : ""}
            maxParticipants={e.maxParticipants}
            isPrivate={e.isPrivate}
            attendeeCount={e.attendeeCount}
            key={e.id}
            id={e.id}
        />
    ));

	return (
		<>
			<div className={styles.tileView}>{eventTiles}</div>
		</>
	);
};

export default TileView;
