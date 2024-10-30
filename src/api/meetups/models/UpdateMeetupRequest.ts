interface UpdateMeetupRequest {
  title: string;
  date: string;
  time: string;
  location: string;
  participants: string[];
  maxParticipants: number;
}

export default UpdateMeetupRequest;
