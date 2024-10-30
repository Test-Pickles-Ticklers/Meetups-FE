interface MeetupModel {
  id: string;
  title: string;
  organizer: string;
  date: string;
  time: string;
  location: string;
  participants: string[];
}

export default MeetupModel;
