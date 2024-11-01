import { useState } from "react";
import DialogModal from "../../common/DialogModal";
import { Button, Grid2 } from "@mui/material";
import useMeetups from "../hooks/useMeetups";
import AddMeetupRequest from "../../../api/meetups/models/AddMeetupRequest";

import { enqueueSnackbar } from "notistack";
import DetailedMeetupCard, {
  EditMeetupModel,
} from "../detailedMeetupCard/DetailedMeetupCard";
import MeetupModel from "../../../api/models/MeetupModel";
import { useUserContext } from "../../../context/UserContext";

interface AddMeetupModalProps {
  addedModalTrigger: () => void;
}

const AddMeetupModal = ({ addedModalTrigger }: AddMeetupModalProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const { meetupAdded } = useMeetups();
  const { user } = useUserContext();
  const [editMeetup, setEditMeetup] = useState<EditMeetupModel>();

  const handleSubmit = async () => {
    const success = await meetupAdded(editMeetup!.meetup as AddMeetupRequest);

    if (success) {
      setOpen(!open);
      enqueueSnackbar("Meetup added!", { variant: "info" });
      addedModalTrigger();
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
    <Grid2
      size={10}
      container
      justifyContent={"flex-end"}
    >
      <Button
        onClick={onOpenClick}
        variant="contained"
      >
        Lägg till meetup
      </Button>
      <DialogModal
        isOpen={open}
        title={"Lägg till ny meetup"}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
      >
        <DetailedMeetupCard
          handleDeleteClick={handleCancel}
          meetup={initialData}
          editMeetup={editMeetup}
          setEditMeetup={setEditMeetup}
          isEdit={true}
          handleEditClick={onOpenClick}
          handleCancelClick={handleCancel}
        />
      </DialogModal>
    </Grid2>
  );
};

export default AddMeetupModal;
