import { useEffect, useState } from "react";
import MeetupModel from "../../../../api/models/MeetupModel";
import { getOrganizedMeetups } from "../../../../api/user/apiUserCalls";
import { enqueueSnackbar } from "notistack";
import { deleteMeetup } from "../../../../api/meetups/apiMeetupCalls";

const useUserMeetups = () => {
  const [meetups, setMeetups] = useState<MeetupModel[]>([]);

  const fetch = async () => {
    try {
      const data = await getOrganizedMeetups();
      setMeetups(data);
    } catch (error) {
      enqueueSnackbar("Fel vid inhämtning av meetups", { variant: "error" });
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const meetupRemoved = async (id: string) => {
    try {
      const success = await deleteMeetup(id);

      fetch();
      return success;
    } catch (error) {
      enqueueSnackbar("Fel vid borttagning av meetup", { variant: "error" });
    }
  };

  return {
    meetups,
    fetch,
    meetupRemoved,
  };
};

export default useUserMeetups;
