import { useEffect, useState } from "react";
import {
  deleteMeetup,
  getMeetupById,
  signupToMeetup,
  unattendToMeetup,
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
  }, [id]);

  const participateInMeetup = async () => {
    try {
      const success = await signupToMeetup(id);

      if (success != undefined) {
        getMeetup();
        enqueueSnackbar("Grattis, du har gått med i meetup", {
          variant: "success",
        });
      }
    } catch (error) {
      enqueueSnackbar("Fel vid anmälan till meetup", { variant: "error" });
    }
  };

  const unparticipateInMeetup = async () => {
    try {
      const success = await unattendToMeetup(id);

      if (success != undefined) {
        getMeetup();
        enqueueSnackbar("Grattis, du har gått ur meetup", {
          variant: "success",
        });
      }
    } catch (error) {
      enqueueSnackbar("Fel vid avanmälan från meetup", { variant: "error" });
    }
  };

  const meetupDeleted = async () => {
    try {
      const success = await deleteMeetup(id);

      return success != undefined;
    } catch (error) {
      enqueueSnackbar("Kunde inte ta bort meetup", { variant: "error" });
    }
  };

  return {
    meetup,
    isLoading,
    meetupUpdated,
    participateInMeetup,
    unparticipateInMeetup,
    meetupDeleted,
  };
};

export default useMeetup;
