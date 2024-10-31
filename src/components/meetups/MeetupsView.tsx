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
import Searchbar from '../searchbar/Searchbar';
import useMeetups from './hooks/useMeetups';
import dayjs, { Dayjs } from "dayjs";

const MeetupsView = () => {
  const [expandedMeetupId, setExpandedMeetupId] = useState<string>('');
  const [date, setDate] = useState<Dayjs | null>(null);
  const { user } = useUserContext();
  const [inputText, setInputText] = useState('');
  const { meetups, getMeetups } = useMeetups();

  const filteredData = meetups
    .filter((el) => {
      return (
        inputText === "" ||
        el.title.toLowerCase().includes(inputText) ||
        el.location.toLowerCase().includes(inputText)
      );
    })
    .map((el) => ({
      ...el,
      dateObj: dayjs(el.date), 
    }))
    .filter((el) => {
      
      if (!date) return true;
      const diffInDays = Math.abs(el.dateObj.diff(date, 'day'));
      return diffInDays <= 30;
    })
    .sort((a, b) => {
      if (!date) return 0;
      const aDiff = Math.abs(a.dateObj.diff(date));
      const bDiff = Math.abs(b.dateObj.diff(date));
      return aDiff - bDiff; 
    });

    const displayedMeetups = inputText || date ? filteredData.slice(0, 10) : filteredData;

  const toggleExpand = (id: string) => {
    setExpandedMeetupId((prevId) => (prevId === id ? '' : id));
  };

  const handleJoinClick = async () => {
    await signupToMeetup(expandedMeetupId);
    getMeetups();
  };

  const handleUnattend = async () => {
    await unattendToMeetup(expandedMeetupId);
    getMeetups();
  };

  return (
    <>
      <AddMeetupModal />
      <Searchbar inputText={inputText} setInputText={setInputText} date={date} setDate={setDate} />
      <Grid2 container spacing={2} direction={'column'} alignItems={'center'}>
        {displayedMeetups.length > 0 ? (
          displayedMeetups.map((meetup) => {
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
