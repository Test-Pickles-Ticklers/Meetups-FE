import { useState } from "react";
import {
  signupToMeetup,
  unattendToMeetup,
} from "../../api/meetups/apiMeetupCalls";
import AddMeetupModal from "./addMeetupModal/AddMeetupModal";
import { Box, Grid2, Typography } from "@mui/material";
import { useUserContext } from "../../context/UserContext";
import useMeetups from "./hooks/useMeetups";
import dayjs, { Dayjs } from "dayjs";
import MeetupCard from "../common/meetupCard/MeetupCard";
import Searchbar from "./searchbar/Searchbar";
import ReviewModal from "./reviewModal/ReviewModal";

const MeetupsView = () => {
  const [expandedMeetupId, setExpandedMeetupId] = useState<string>("");
  const [date1, setDate1] = useState<Dayjs | null>(null);
  const [date2, setDate2] = useState<Dayjs | null>(null);
  const [category, setCategory] = useState("")
  const { user } = useUserContext();
  const [inputText, setInputText] = useState("");
  const { getMeetups, upcomingMeetups, historicMeetups, meetups } =
    useMeetups();
  const [reviewModalOpen, setReviewModalOpen] = useState<boolean>(false);

  // const filterOnText = upcomingMeetups
  //   .filter((el) => {
  //     const textMatch =
  //       inputText === "" ||
  //       el.title.toLowerCase().includes(inputText.toLowerCase()) ||
  //       el.location.toLowerCase().includes(inputText.toLowerCase())

  //     return textMatch;
  //   })

  //   const filterOnDate = upcomingMeetups
  //     .map((el) => ({
  //       ...el,
  //       dateObj: dayjs(el.date),
  //   }))
  //   .filter((el) => {
  //     if(!date1 && !date2) return true;
  //     if(date1 && date2){
  //       return el.dateObj.isAfter(date1, "day") && el.dateObj.isBefore(date2, "day")
  //     }
  //     return true;
  //   })

  //   const filterOnCategory = upcomingMeetups
  //   .filter((el) => {
  //     if(category === ""){
  //       return el
  //     }
  //     return el.category === "" || el.category === category.toLowerCase();
  //   });

  // const displayedMeetups = date1 && date2 ? filterOnDate : filterOnText
  const displayedMeetups = upcomingMeetups
  .map((el) => ({
    ...el,
    dateObj: dayjs(el.date), // Convert date once for reusability
  }))
  .filter((el) => {
    // Text filter
    const textMatch =
      inputText === "" ||
      el.title.toLowerCase().includes(inputText.toLowerCase()) ||
      el.location.toLowerCase().includes(inputText.toLowerCase());

    // Date filter
    const dateMatch =
      (!date1 && !date2) ||
      (date1 && date2 && el.dateObj.isAfter(date1, "day") && el.dateObj.isBefore(date2, "day"));

    // Category filter
    const categoryMatch = category === "" || el.category.toLowerCase() === category.toLowerCase();

    // Return true only if all conditions match
    return textMatch && dateMatch && categoryMatch;
  });

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

  return (
    <Grid2 p={2}>
      <AddMeetupModal />
      <Grid2 container direction="row">
        <Grid2 size={5}>
          <Searchbar
            inputText={inputText}
            setInputText={setInputText}
            date1={date1}
            setDate1={setDate1}
            date2={date2}
            setDate2={setDate2}
            category={category}
            setCategory={setCategory}
          />
          <Grid2
            container
            spacing={2}
            direction={"column"}
            alignItems={"center"}
          >
            <Typography>Kommande meetups</Typography>
            {displayedMeetups.length > 0 ? (
              displayedMeetups.map((meetup) => (
                <Grid2 size={12} p={1}>
                  <MeetupCard
                    joinButtonDisabled={
                      user == null || user.email == meetup.organizer
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
                  />
                </Grid2>
              ))
            ) : (
              <Typography>Inga kommande meetups.</Typography>
            )}
          </Grid2>
        </Grid2>
        <Grid2 size={5}>
          <Grid2
            container
            spacing={2}
            direction={"column"}
            alignItems={"center"}
          >
            <Typography>Gamla meetups</Typography>
            {historicMeetups.length > 0 ? (
              historicMeetups.map((meetup) => (
                <Grid2 size={12} p={1}>
                  <MeetupCard
                    joinButtonDisabled={true}
                    isParticipant={
                      user != null && meetup.participants.includes(user.email)
                    }
                    meetup={meetup}
                    expandedId={expandedMeetupId}
                    toggleExpand={(id: string) => toggleExpand(id)}
                    canPutReview={
                      user != null && meetup.participants.includes(user.email)
                    }
                    handleReviewClick={handleReviewClick}
                  />
                </Grid2>
              ))
            ) : (
              <Typography>Inga gamla meetups.</Typography>
            )}
          </Grid2>
        </Grid2>
      </Grid2>
      <ReviewModal
        open={reviewModalOpen}
        setOpen={setReviewModalOpen}
        meetupsId={expandedMeetupId}
      />
    </Grid2>
  );
};

export default MeetupsView;