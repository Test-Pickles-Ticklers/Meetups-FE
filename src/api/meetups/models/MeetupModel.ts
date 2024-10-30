interface MeetupModel {
  _id: string;
  title: string;
  organizer: string;
  date: string;
  time: string;
  location: string;
  participants: string[];
  maxParticipants: number;
}

export default MeetupModel;
