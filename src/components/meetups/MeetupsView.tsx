import { useState } from "react";
import {
  signupToMeetup,
  unattendToMeetup,
} from "../../api/meetups/apiMeetupCalls";
import AddMeetupModal from "./addMeetupModal/AddMeetupModal";
import { Grid2, Typography } from "@mui/material";
import { useUserContext } from "../../context/UserContext";
import useMeetups from "./hooks/useMeetups";
import dayjs, { Dayjs } from "dayjs";
import MeetupCard from "../common/meetupCard/MeetupCard";
import Searchbar from "./searchbar/Searchbar";
import ReviewModal from "./reviewModal/ReviewModal";

const MeetupsView = () => {
  const [expandedMeetupId, setExpandedMeetupId] = useState<string>("");
  const [date, setDate] = useState<Dayjs | null>(null);
  const { user } = useUserContext();
  const [inputText, setInputText] = useState("");
  const { meetups, getMeetups } = useMeetups();
  const [reviewModalOpen, setReviewModalOpen] = useState<boolean>(false);
  const [category, setCategory] = useState<string>("");

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
      const diffInDays = Math.abs(el.dateObj.diff(date, "day"));
      return diffInDays <= 30;
    })
    .sort((a, b) => {
      if (!date) return 0;
      const aDiff = Math.abs(a.dateObj.diff(date));
      const bDiff = Math.abs(b.dateObj.diff(date));
      return aDiff - bDiff;
    });

  const displayedMeetups =
    inputText || date ? filteredData.slice(0, 10) : filteredData;

  const toggleExpand = (id: string) => {
    setExpandedMeetupId((prevId) => (prevId === id ? "" : id));
  };

  const handleJoinClick = async () => {
    await signupToMeetup(expandedMeetupId);
    getMeetups();
  };

  const handleUnattend = async () => {
    await unattendToMeetup(expandedMeetupId);
    getMeetups();
  };

  const handleReviewClick = async () => {
    setReviewModalOpen(!reviewModalOpen);
  };

  const currentDate = dayjs();

  return (
    <>
      <AddMeetupModal />
      <Searchbar
        inputText={inputText}
        setInputText={setInputText}
        date={date}
        setDate={setDate}
        category={category}
        setCategory={setCategory}
      />
      <Grid2
        container
        spacing={2}
        direction={"column"}
        alignItems={"center"}
      >
        {displayedMeetups.length > 0 ? (
          displayedMeetups.map((meetup) => (
            <Grid2
              size={6}
              p={1}
            >
              <MeetupCard
                joinButtonDisabled={
                  user == null ||
                  user.email == meetup.organizer ||
                  currentDate.isAfter(meetup.date)
                }
                isParticipant={
                  user != null && meetup.participants.includes(user.email)
                }
                meetup={meetup}
                handleButtonClick={
                  user && meetup.participants.includes(user.email)
                    ? handleUnattend
                    : handleJoinClick
                }
                expandedId={expandedMeetupId}
                toggleExpand={(id: string) => toggleExpand(id)}
                canPutReview={
                  user
                    ? meetup.participants.includes(user.email) &&
                      currentDate.isAfter(meetup.date)
                    : false
                }
                handleReviewClick={handleReviewClick}
              />
            </Grid2>
          ))
        ) : (
          <Typography>No meetups found.</Typography>
        )}
      </Grid2>
      <ReviewModal
        open={reviewModalOpen}
        setOpen={setReviewModalOpen}
        meetupsId={expandedMeetupId}
      />
    </>
  );
};

export default MeetupsView;
