import React, { useState } from "react";
import DialogModal from "../../common/DialogModal";
import { Button } from "@mui/material";
import useMeetups from "../hooks/useMeetups";
import AddMeetupRequest from "../../../api/meetups/models/AddMeetupRequest";

const initialData: AddMeetupRequest = {
  title: "",
  date: "",
  time: "",
  location: "",
  maxParticipants: 10,
};

const AddMeetupModal = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { addMeetup } = useMeetups();
  const [formData, setFormData] = useState<AddMeetupRequest>(initialData);

  const handleSubmit = async () => {
    await addMeetup(formData);
    setOpen(!open);
  };

  const handleCancel = () => {
    setFormData(initialData);
    setOpen(!open);
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>Lägg till meetup</Button>
      <DialogModal
        isOpen={open}
        title={"Lägg till ny meetup"}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
      >
        <></>
      </DialogModal>
    </>
  );
};

export default AddMeetupModal;
