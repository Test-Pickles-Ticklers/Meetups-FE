import { useEffect, useState } from "react";
import MeetupModel from "../../../../api/models/MeetupModel";
import { getMyMeetups } from "../../../../api/user/apiUserCalls";
import { enqueueSnackbar } from "notistack";

const useMeetupAttending = () => {
  const [meetups, setMeetups] = useState<MeetupModel[]>([]);

  const fetch = async () => {
    try {
      const data = await getMyMeetups();
      setMeetups(data);
    } catch (error) {
      enqueueSnackbar("Fel vid inhämtning av meetups", { variant: "error" });
    }
  };

  useEffect(() => {
    fetch();
  }, []);
  return {
    meetups,
    fetch,
  };
};

export default useMeetupAttending;
