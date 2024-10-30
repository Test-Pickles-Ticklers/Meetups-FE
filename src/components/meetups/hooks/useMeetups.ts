import { useEffect, useState } from 'react';
import MeetupModel from '../../../api/meetups/models/MeetupModel';
import {
  getAllMeetups,
  getMeetupById,
} from '../../../api/meetups/apiMeetupCalls';
import AddMeetupRequest from '../../../api/meetups/models/AddMeetupRequest';

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

  const addMeetup = async (meetup: AddMeetupRequest) => {
    getMeetups();
  };

  const updateMeetup = async () => {
    getMeetups();
  };

  useEffect(() => {
    setIsLoading(true);

    getMeetups();
  }, []);

  return {
    isLoading,
    meetups,
    addMeetup,
    updateMeetup,
    getSingleMeetup,
  };
};

export default useMeetups;
