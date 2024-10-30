import { useEffect, useState } from 'react';
import { getAllMeetups } from '../../api/meetups/apiMeetupCalls';
import MeetupModel from '../../api/meetups/models/MeetupModel';

const MeetupsView = () => {
  const [data, setData] = useState<MeetupModel[]>([]);

  const fetchData = async () => {
    try {
      const response = await getAllMeetups();
      console.log('Meetups data:', response);

      setData(response);
    } catch (error: any) {
      console.error('Error fetching meetups:', error.message || error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {data.length > 0 ? (
        data.map((meetup) => (
          <div key={meetup.id}>
            <h2>{meetup.title}</h2>
            <p>Organizer: {meetup.organizer}</p>
            <p>Date: {meetup.date}</p>
            <p>Time: {meetup.time}</p>
            <p>Location: {meetup.location}</p>
            <p>Participants: {meetup.participants.join(', ')}</p>
          </div>
        ))
      ) : (
        <p>No meetups found.</p>
      )}
    </>
  );
};

export default MeetupsView;
