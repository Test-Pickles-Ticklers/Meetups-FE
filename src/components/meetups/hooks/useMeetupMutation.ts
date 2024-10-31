import { useEffect, useState } from "react";
import {
  getMeetupById,
  signupToMeetup,
} from "../../../api/meetups/apiMeetupCalls";
import MeetupModel from "../../../api/models/MeetupModel";

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
