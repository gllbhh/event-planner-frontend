export interface Session {
	id: number;
	title: string;
	description: string;
	date: string;
	time: string;
	maxParticipants: number;
	isPrivate: boolean;
	attendees?: number;
}
