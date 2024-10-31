import { useEffect, useState } from 'react';
import {
  getAllMeetups,
  signupToMeetup,
  unattendToMeetup,
} from '../../api/meetups/apiMeetupCalls';
import MeetupModel from '../../api/meetups/models/MeetupModel';
import AddMeetupModal from './addMeetupModal/AddMeetupModal';
import { Grid2 } from '@mui/material';
import MeetupCard from './meetupCard/MeetupCard';
import { useUserContext } from '../../context/UserContext';

const MeetupsView = () => {
  const [data, setData] = useState<MeetupModel[]>([]);
  const [expandedMeetupId, setExpandedMeetupId] = useState<string>('');
  const { user } = useUserContext();

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

  const toggleExpand = (id: string) => {
    setExpandedMeetupId((prevId) => (prevId === id ? '' : id));
  };

  const handleJoinClick = async () => {
    const data = await signupToMeetup(expandedMeetupId);
    fetchData();
  };

  const handleUnattend = async () => {
    const data = await unattendToMeetup(expandedMeetupId);
    fetchData();
  };

  return (
    <>
      <AddMeetupModal />
      <Grid2 container spacing={2} direction={'column'} alignItems={'center'}>
        {data.length > 0 ? (
          data.map((meetup) => {
            return (
              <Grid2 size={6} p={1}>
                <MeetupCard
                  joinButtonDisabled={user == null}
                  isParticipant={meetup.participants.includes(user!.email)}
                  meetup={meetup}
                  handleJoinClick={
                    meetup.participants.includes(user!.email)
                      ? handleUnattend
                      : handleJoinClick
                  }
                  expandedId={expandedMeetupId}
                  toggleExpand={(id: string) => toggleExpand(id)}
                />
              </Grid2>
            );
          })
        ) : (
          <p>No meetups found.</p>
        )}
      </Grid2>
    </>
  );
};

export default MeetupsView;
