import React from "react";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import type { Session } from "../types/types";

const CreateEvent = () => {
	const emptySession: Session = {
		id: 0,
		title: "",
		description: "",
		date: "",
		time: "",
		maxParticipants: 0,
		isPrivate: false,
	};

	const [session, setSession] = useState<Session>(emptySession);

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

	const saveSession = () => {
		console.log(session);
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
