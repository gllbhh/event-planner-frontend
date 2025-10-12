import React from "react";
import { useState } from "react";
import type { Event } from "../types/types";
import { useNavigate } from "react-router-dom";

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

	const updateSession = (e: React.ChangeEvent<HTMLInputElement>) => {
		const fieldName = e.target.name;
		const fieldType = e.target.type;
		const fieldValue =
			fieldType === "checkbox" ? e.target.checked : fieldType === "number" ? Number(e.target.value) : e.target.value;
		const newSession = {
			...session,
			[fieldName]: fieldValue,
		};
		setSession(newSession);
		console.log(newSession);
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

			const response = await fetch("http://localhost:4000/api/sessions", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(payload),
			});
			if (!response.ok) {
				throw new Error("Failed to create event");
			}
			const data = await response.json();
			console.log("Event created:", data);
			navigate(`/event/${data.id}`);
			// Optionally, redirect or show a success message here
		} catch (error) {
			console.error(error);
			// Optionally, show an error message to the user
		}
	};




	return (
		<div className="d-flex flex-column">
			<h1>CreateEvent</h1>
			<input className="form-control" placeholder="Title" name="title" onChange={updateSession} value={session.title} />
			<input
				className="form-control"
				placeholder="Description"
				name="description"
				checked={session.isPrivate}
				onChange={updateSession}
				value={session.description}
			/>
			<input
				className="form-control"
				placeholder="Maximum Participants"
				type="number"
				name="maxParticipants"
				onChange={updateSession}
			/>
			<div className="mb-3">
				<label htmlFor="dateInput" className="form-label">
					Date
				</label>
				<input type="date" className="form-control" id="dateInput" name="date" onChange={updateSession} />
			</div>

			<div className="mb-3">
				<label htmlFor="timeInput" className="form-label">
					Time
				</label>
				<input type="time" className="form-control" id="timeInput" step="60" name="time" onChange={updateSession} />
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
					onChange={updateSession}
				/>
			</div>

			<button type="button" className="btn btn-primary" onClick={saveSession}>
				Create Event
			</button>
		</div>
	);
};

export default CreateEvent;
