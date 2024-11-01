import React, { useState } from "react";
import DialogModal from "../../common/DialogModal";
import { Button, Grid2, MenuItem, TextField } from "@mui/material";
import useMeetups from "../hooks/useMeetups";
import AddMeetupRequest from "../../../api/meetups/models/AddMeetupRequest";
import {
  DatePicker,
  renderTimeViewClock,
  TimePicker,
} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { enqueueSnackbar } from "notistack";
import DetailedMeetupCard, {
  EditMeetupModel,
} from "../detailedMeetupCard/DetailedMeetupCard";
import MeetupModel from "../../../api/models/MeetupModel";
import { useUserContext } from "../../../context/UserContext";

const AddMeetupModal = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { meetupAdded } = useMeetups();
  const { user } = useUserContext();
  const [editMeetup, setEditMeetup] = useState<EditMeetupModel>();

  const handleSubmit = async () => {
    const success = await meetupAdded(editMeetup!.meetup as AddMeetupRequest);

    if (success) {
      setOpen(!open);
      enqueueSnackbar("Meetup added!", { variant: "info" });
    }
  };

  const handleCancel = () => {
    setEditMeetup(undefined);
    setOpen(!open);
  };

  const initialData: MeetupModel = {
    _id: "",
    title: "",
    date: "",
    time: "",
    location: "",
    maxParticipants: 10,
    category: "",
    description: "",
    organizer: user!.email,
    participants: [],
  };

  const onOpenClick = () => {
    setEditMeetup({ isNew: true, meetup: initialData });
    setOpen(true);
  };

  return (
    <>
      <Button onClick={onOpenClick}>Lägg till meetup</Button>
      <DialogModal
        isOpen={open}
        title={"Lägg till ny meetup"}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
      >
        <DetailedMeetupCard
          meetup={initialData}
          editMeetup={editMeetup}
          setEditMeetup={setEditMeetup}
          isEdit={true}
          handleEditClick={onOpenClick}
          handleCancelClick={handleCancel}
        />
      </DialogModal>
    </>
  );
};

export default AddMeetupModal;
