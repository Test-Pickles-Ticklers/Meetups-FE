import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useMeetup from "../hooks/useMeetup";
import DetailedMeetupCard, {
  EditMeetupModel,
} from "../detailedMeetupCard/DetailedMeetupCard";
import dayjs from "dayjs";
import { Button, Grid2 } from "@mui/material";
import Reviews from "./reviews/Reviews";
import { useUserContext } from "../../../context/UserContext";
import { enqueueSnackbar } from "notistack";

const MeetupView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    meetup,
    isLoading,
    meetupUpdated,
    unparticipateInMeetup,
    participateInMeetup,
    meetupDeleted,
  } = useMeetup(id!);
  const { user } = useUserContext();
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

  const handleDeleteClick = async () => {
    const success = await meetupDeleted();

    if (success) {
      enqueueSnackbar("Meetup borttagen", { variant: "success" });
      navigate("/meetups");
    }
  };

  const [meetupHasPassed, setMeetupHasPassed] = useState<boolean>(false);
  const [participated, setParticipated] = useState<boolean>(false);
  const [eligableToParticipate, setEligableToParticiapte] =
    useState<boolean>(true);

  useEffect(() => {
    if (meetup) {
      const dateHasPassed = currentDate.isAfter(meetup.date);
      const hasParticipated = meetup.participants.includes(user!.email);
      const visitorOfMeetup = meetup.organizer != user!.email;

      setMeetupHasPassed(dateHasPassed);
      setParticipated(hasParticipated);
      setEligableToParticiapte(visitorOfMeetup);
    }
  }, [meetup]);

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
              handleDeleteClick={handleDeleteClick}
            />
          </>
        )}
        {meetup && meetupHasPassed ? (
          <Reviews
            meetupId={meetup._id}
            eligableToReview={participated && meetupHasPassed}
          />
        ) : (
          <Grid2
            container
            paddingTop={1}
            direction={"row-reverse"}
          >
            <Button
              onClick={
                participated ? unparticipateInMeetup : participateInMeetup
              }
              disabled={!eligableToParticipate}
              variant="contained"
            >
              {participated
                ? "Avanmäl dig från meetup"
                : "Anmäl dig till meetup"}
            </Button>
          </Grid2>
        )}
      </Grid2>
    </Grid2>
  );
};

//Kunna anmäla sig/lägga recension

export default MeetupView;
