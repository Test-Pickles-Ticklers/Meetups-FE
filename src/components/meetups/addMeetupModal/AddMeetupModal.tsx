import React, { useState } from "react";
import DialogModal from "../../common/DialogModal";
import { Button, Grid2, TextField } from "@mui/material";
import useMeetups from "../hooks/useMeetups";
import AddMeetupRequest from "../../../api/meetups/models/AddMeetupRequest";
import {
  DatePicker,
  renderTimeViewClock,
  TimePicker,
} from "@mui/x-date-pickers";
import dayjs from "dayjs";

const initialData: AddMeetupRequest = {
  title: "",
  date: "",
  time: "",
  location: "",
  maxParticipants: 10,
};

const AddMeetupModal = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { meetupAdded } = useMeetups();
  const [formData, setFormData] = useState<AddMeetupRequest>(initialData);

  const handleSubmit = async () => {
    await meetupAdded(formData);
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
        <Grid2
          p={2}
          container
          spacing={1}
          justifyContent={"flex-start"}
        >
          <Grid2 size={6}>
            <TextField
              required
              fullWidth
              value={formData.title ?? ""}
              type="text"
              label="Titel"
              onChange={(e: any) => {
                setFormData((prevState) => ({
                  ...prevState,
                  title: e.target.value,
                }));
              }}
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              required
              fullWidth
              value={formData.location ?? ""}
              type="text"
              label="Plats"
              onChange={(e: any) => {
                setFormData((prevState) => ({
                  ...prevState,
                  location: e.target.value,
                }));
              }}
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              required
              fullWidth
              value={formData.maxParticipants ?? undefined}
              type="number"
              label="Max deltagare"
              onChange={(e: any) => {
                setFormData((prevState) => ({
                  ...prevState,
                  maxParticipants: e.target.value,
                }));
              }}
            />
          </Grid2>
          <Grid2 size={6}>
            <DatePicker
              label="Datum"
              value={formData.date ? dayjs(formData.date, "YYYY-MM-DD") : null}
              disablePast
              views={["year", "month", "day"]}
              onChange={(value) => {
                const date = dayjs(value).format("YYYY-MM-DD");
                setFormData((prevState) => ({
                  ...prevState,
                  date: date,
                }));
              }}
              slotProps={{
                textField: {
                  fullWidth: true,
                  required: true,
                },
              }}
            />
          </Grid2>
          <Grid2 size={6}>
            <TimePicker
              label="Tid"
              value={formData.time ? dayjs(formData.time, "HH:mm") : null}
              onChange={(value) => {
                const time = dayjs(value).format("HH:mm");
                setFormData((prevState) => ({
                  ...prevState,
                  time: time,
                }));
              }}
              ampm={false}
              slotProps={{
                textField: {
                  fullWidth: true,
                  required: true,
                },
              }}
              viewRenderers={{
                hours: renderTimeViewClock,
                minutes: renderTimeViewClock,
              }}
            />
          </Grid2>
        </Grid2>
      </DialogModal>
    </>
  );
};

export default AddMeetupModal;
