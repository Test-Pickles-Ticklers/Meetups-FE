import { useState } from "react";
import {
  signupToMeetup,
  unattendToMeetup,
} from "../../api/meetups/apiMeetupCalls";
import AddMeetupModal from "./addMeetupModal/AddMeetupModal";
import { Grid2 } from "@mui/material";
import MeetupCard from "../common/meetupCard/MeetupCard";
import { useUserContext } from "../../context/UserContext";
import Searchbar from "./searchbar/Searchbar";
import useMeetups from "./hooks/useMeetups";

const MeetupsView = () => {
  const [expandedMeetupId, setExpandedMeetupId] = useState<string>("");
  const { user } = useUserContext();
  const [inputText, setInputText] = useState("");
  const { meetups, getMeetups } = useMeetups();

  const filteredData = meetups.length
    ? meetups.filter((el) => {
        if (inputText === "") {
          return el;
        } else {
          return (
            el.title.toLowerCase().includes(inputText) ||
            el.location.toLowerCase().includes(inputText)
          );
        }
      })
    : [];

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

  return (
    <>
      <AddMeetupModal />
      <Searchbar
        inputText={inputText}
        setInputText={setInputText}
      />
      <Grid2
        container
        spacing={2}
        direction={"column"}
        alignItems={"center"}
      >
        {filteredData.length > 0 ? (
          filteredData.map((meetup) => {
            return (
              <Grid2
                size={6}
                p={1}
              >
                <MeetupCard
                  joinButtonDisabled={user == null}
                  isParticipant={meetup.participants.includes(user!.email)}
                  meetup={meetup}
                  handleButtonClick={
                    meetup.participants.includes(user!.email)
                      ? handleUnattend
                      : handleJoinClick
                  }
                  expandedId={expandedMeetupId}
                  toggleExpand={(id: string) => toggleExpand(id)}
                />
              </Grid2>
            );
          })
        ) : (
          <p>No meetups found.</p>
        )}
      </Grid2>
    </>
  );
};

export default MeetupsView;
