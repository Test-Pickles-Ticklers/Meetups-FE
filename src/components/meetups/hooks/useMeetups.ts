import { useEffect, useState } from 'react';
import MeetupModel from '../../../api/meetups/models/MeetupModel';
import {
  addMeetup,
  getAllMeetups,
  getMeetupById,
} from '../../../api/meetups/apiMeetupCalls';
import AddMeetupRequest from '../../../api/meetups/models/AddMeetupRequest';
import { enqueueSnackbar } from 'notistack';

const useMeetups = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [meetups, setMeetups] = useState<MeetupModel[]>([]);

  const getMeetups = async () => {
    const data = await getAllMeetups();

    setMeetups(data);
    setIsLoading(false);
  };

  const getSingleMeetup = async (id: string) => {
    const singleMeetup = await getMeetupById(id);
    return singleMeetup;
  };

  const meetupAdded = async (meetup: AddMeetupRequest) => {
    try {
      await addMeetup(meetup);
      getMeetups();
    } catch (error) {
      enqueueSnackbar('Fel vid skapande av meetup', { variant: 'error' });
    }
  };

  useEffect(() => {
    setIsLoading(true);

    getMeetups();
  }, []);
  return {
    isLoading,
    meetups,
    meetupAdded,
    getSingleMeetup,
    getMeetups,
  };
};

export default useMeetups;
