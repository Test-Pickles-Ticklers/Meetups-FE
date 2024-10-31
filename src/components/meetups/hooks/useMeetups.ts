import { getMeetupById } from "../../../api/meetups/apiMeetupCalls";
import { useEffect, useState } from "react";
import MeetupModel from "../../../api/models/MeetupModel";
import { addMeetup, getAllMeetups } from "../../../api/meetups/apiMeetupCalls";
import AddMeetupRequest from "../../../api/meetups/models/AddMeetupRequest";
import { enqueueSnackbar } from "notistack";
import dayjs from "dayjs";

const useMeetups = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [meetups, setMeetups] = useState<MeetupModel[]>([]);
  const [upcomingMeetups, setUpcomingMeetups] = useState<MeetupModel[]>([]);
  const [historicMeetups, setHistoricMeetups] = useState<MeetupModel[]>([]);

  const getMeetups = async () => {
    const data = await getAllMeetups();
    filterMeetupsOndate(data);
    setMeetups(data);
    setIsLoading(false);
  };

  const filterMeetupsOndate = (meetups: MeetupModel[]) => {
    const upcoming: MeetupModel[] = [];
    const historic: MeetupModel[] = [];

    meetups.map((meetup) => {
      if (dayjs().isBefore(meetup.date)) {
        upcoming.push(meetup);
      } else if (dayjs().isAfter(meetup.date)) {
        historic.push(meetup);
      }
    });

    setHistoricMeetups(historic);
    setUpcomingMeetups(upcoming);
  };

  const getSingleMeetup = async (id: string) => {
    const singleMeetup = await getMeetupById(id);
    return singleMeetup;
  };

  const meetupAdded = async (meetup: AddMeetupRequest) => {
    try {
      const success = await addMeetup(meetup);
      await getMeetups();

      return success;
    } catch (error) {
      enqueueSnackbar("Fel vid skapande av meetup", { variant: "error" });
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
    upcomingMeetups,
    historicMeetups,
  };
};

export default useMeetups;
