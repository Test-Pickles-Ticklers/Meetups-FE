import { Box, Grid2, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import MeetupCard from "../../common/meetupCard/MeetupCard";
import useUserMeetups from "./hooks/useUserMeetups";

const UserMeetups = () => {
  const theme = useTheme();
  const { meetups, fetch, meetupRemoved } = useUserMeetups();
  const [selectedId, setSelectedId] = useState<string>("");

  const toggleExpand = (id: string) => {
    setSelectedId((prev) => (prev == id ? "" : id));
  };

  const handleButtonClick = async () => {
    await meetupRemoved(selectedId);
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
          Skapade meetups
        </Typography>
        {meetups.length > 0 ? (
          meetups.map((meetup) => {
            return (
              <MeetupCard
                key={meetup._id}
                meetup={meetup}
                expandedId={selectedId}
                toggleExpand={(id: string) => toggleExpand(id)}
                isParticipant={false}
                joinButtonDisabled={false}
                handleButtonClick={handleButtonClick}
                canDelete={true}
              />
            );
          })
        ) : (
          <Typography>Du har inga skapade meetups</Typography>
        )}
      </Grid2>
    </Box>
  );
};

export default UserMeetups;
