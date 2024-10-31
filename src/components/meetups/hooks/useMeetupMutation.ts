import { useEffect, useState } from 'react';
import MeetupModel from '../../../api/meetups/models/MeetupModel';
import {
  getMeetupById,
  signupToMeetup,
} from '../../../api/meetups/apiMeetupCalls';

const useMeetupMutation = (id: string) => {
  const [meetup, setMeetup] = useState<MeetupModel>();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const updateMeetup = async () => {};

  const getMeetup = async () => {
    const data = await getMeetupById(id);

    setIsLoading(false);
    setMeetup(data);
  };

  useEffect(() => {
    getMeetup();
  }, []);

  return { meetup, isLoading, updateMeetup };
};

export default useMeetupMutation;
