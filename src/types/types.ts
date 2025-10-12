export interface Event {
	id: number;
	title: string;
	description: string;
	date: string;
	time: string;
	maxParticipants: number;
	isPrivate: boolean;
	attendees?: AttendeeType[];
	attendeeCount?: number;
	attendeeNames?: string[];
}

export interface AttendeeType {
	id: string,
	sessionId: string,
	attendeeName: string,
	attendeeEmail: string,
	attendanceCode: string,
}
