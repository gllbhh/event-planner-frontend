import React from "react";
import { useState } from "react";
import type { Event } from "../types/types";
import { useNavigate } from "react-router-dom";
import styles from "../css/modules/CreateEvent.module.css";


const CreateEvent = () => {

	const navigate = useNavigate();

	
	const emptySession: Event = {
		id: 0,
		title: "",
		description: "",
		date: "",
		time: "",
		maxParticipants: 0,
		isPrivate: false,
	};

	const [session, setSession] = useState<Event>(emptySession);

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


	const saveSession = async () => {
		try {
			// Combine date and time into a single ISO string
			const dateTime = session.date && session.time
				? new Date(`${session.date}T${session.time}`).toISOString()
				: "";

			const payload = {
				title: session.title,
				description: session.description,
				dateTime, // single ISO string
				maxParticipants: session.maxParticipants,
				isPrivate: session.isPrivate,
			};

			const response = await fetch("https://event-planner-api-d4g6g2acakabbfdu.northeurope-01.azurewebsites.net/api/sessions", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(payload),
			});
			if (!response.ok) {
				navigate("/create/fail");
  				return;
			}
			const data = await response.json();
			console.log("Event created:", data);
			navigate(`event/${data.id}`);
			// Optionally, redirect or show a success message here
		} catch (error) {
			console.error(error);
			// Optionally, show an error message to the user
		}
	};




	return (
		<div className="card cheerful-card p-4" style={{ maxWidth: 800, margin: "2rem auto", border: "none" }}>
			<h1>CreateEvent</h1>
			<input className="form-control" placeholder="Title" name="title" onChange={updateSessionHandler} value={session.title} />
			<textarea
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
			/>
			<div className="mb-3">
				<label htmlFor="dateInput" className="form-label">
					Date
				</label>
				<input type="date" className="form-control" id="dateInput" name="date" onChange={updateSessionHandler} />
			</div>

			<div className="mb-3">
				<label htmlFor="timeInput" className="form-label">
					Time
				</label>
				<input type="time" className="form-control" id="timeInput" step="60" name="time" onChange={updateSessionHandler} />
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
				Create Event
			</button>
		</div>
	);
};

export default CreateEvent;
