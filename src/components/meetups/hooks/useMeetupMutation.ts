import { useEffect, useState } from "react";
import {
  getMeetupById,
  updateMeetup,
} from "../../../api/meetups/apiMeetupCalls";
import MeetupModel from "../../../api/models/MeetupModel";
import UpdateMeetupRequest from "../../../api/meetups/models/UpdateMeetupRequest";
import { enqueueSnackbar } from "notistack";

const useMeetup = (id: string) => {
  const [meetup, setMeetup] = useState<MeetupModel>();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const meetupUpdated = async (
    meetup: UpdateMeetupRequest
  ): Promise<boolean> => {
    try {
      await updateMeetup(id, meetup);
      getMeetup();
      return true;
    } catch (error) {
      enqueueSnackbar("Något gick fel vid uppdatering av meetup", {
        variant: "error",
      });
      return false;
    }
  };

  const getMeetup = async () => {
    const data = await getMeetupById(id);

    setIsLoading(false);
    setMeetup(data);
  };

  useEffect(() => {
    getMeetup();
  }, []);

  return { meetup, isLoading, meetupUpdated };
};

export default useMeetup;
