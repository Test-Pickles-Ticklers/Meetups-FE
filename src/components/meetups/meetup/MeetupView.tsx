import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useMeetup from "../hooks/useMeetupMutation";
import DetailedMeetupCard, {
  EditMeetupModel,
} from "../detailedMeetupCard/DetailedMeetupCard";
import dayjs from "dayjs";
import { Grid2 } from "@mui/material";

const MeetupView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { meetup, isLoading, meetupUpdated } = useMeetup(id!);
  const [editMeetup, setEditMeetup] = useState<EditMeetupModel>();
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const currentDate = dayjs();

  const handleEditClick = async () => {
    if (!isEdit) {
      setIsEdit(true);
      setEditMeetup({ isNew: false, meetup });
      return;
    }
    if (isEdit && editMeetup) {
      const response = await meetupUpdated(editMeetup.meetup!);

      if (response) {
        handleCancelClick();
      }
    }
  };

  const handleCancelClick = () => {
    setEditMeetup(undefined);
    setIsEdit(false);
  };

  if (!id) navigate("/meetups");
  return (
    <Grid2
      justifyContent={"center"}
      container
    >
      <Grid2 size={8}>
        {meetup && !isLoading && (
          <>
            <DetailedMeetupCard
              meetup={meetup}
              isEdit={isEdit}
              editMeetup={editMeetup}
              setEditMeetup={setEditMeetup}
              handleEditClick={handleEditClick}
              handleCancelClick={handleCancelClick}
            />
            {/* <ButtonField /> */}
          </>
        )}
        {currentDate.isAfter(meetup?.date) ? (
          <>Recensioner</>
        ) : (
          <>Liknande kategorier</>
        )}
      </Grid2>
    </Grid2>
  );
};

//Kunna anmäla sig/lägga recension

export default MeetupView;
