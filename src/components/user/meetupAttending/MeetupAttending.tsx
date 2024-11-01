import { useState } from "react";
import useMeetupAttending from "./hooks/useMeetupAttending";
import { Box, Grid2, Typography, useTheme } from "@mui/material";
import MeetupCard from "../../common/meetupCard/MeetupCard";
import { unattendToMeetup } from "../../../api/meetups/apiMeetupCalls";

const MeetupAttending = () => {
  const theme = useTheme();
  const { meetups, fetch } = useMeetupAttending();
  const [selectedId, setSelectedId] = useState<string>("");

  const unattendMeetup = async () => {
    await unattendToMeetup(selectedId);

    fetch();
  };

  const toggleExpand = (id: string) => {
    setSelectedId((prev) => (prev == id ? "" : id));
  };

  return (
    <Box bgcolor={theme.palette.background.paper}>
      <Grid2
        container
        spacing={1}
        direction={"column"}
        padding={1}
      >
        <Typography
          textAlign={"center"}
          variant="h5"
        >
          Anmälda meetups
        </Typography>
        {meetups.length > 0 ? (
          meetups.map((meetup) => {
            return (
              <MeetupCard
                key={meetup._id}
                meetup={meetup}
                handleButtonClick={unattendMeetup}
                expandedId={selectedId}
                toggleExpand={(id: string) => toggleExpand(id)}
                isParticipant={true}
                joinButtonDisabled={false}
              />
            );
          })
        ) : (
          <Typography>Inga anmälda meetups</Typography>
        )}
      </Grid2>
    </Box>
  );
};

export default MeetupAttending;
