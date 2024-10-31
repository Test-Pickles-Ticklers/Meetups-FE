import { useState } from "react";
import DialogModal from "../../common/DialogModal";
import { Grid2, Rating, TextField } from "@mui/material";

import { enqueueSnackbar } from "notistack";
import AddReviewRequest from "../../../api/reviews/models/AddReviewRequest";
import { useUserContext } from "../../../context/UserContext";
import { addReview } from "../../../api/reviews/apiReviewCalls";

interface ReviewModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  meetupsId: string;
}

const ReviewModal = ({ open, setOpen, meetupsId }: ReviewModalProps) => {
  const { user } = useUserContext();
  const initialData: AddReviewRequest = {
    meetupsId: meetupsId,
    reviewer: user!.email,
    comment: "",
    rating: 4,
  };

  const [formData, setFormData] = useState<AddReviewRequest>(initialData);

  const handleSubmit = async () => {
    try {
      const success = await addReview(meetupsId, formData);

      if (success != undefined) {
        setOpen(!open);
        enqueueSnackbar("Review tillagd!", { variant: "success" });
      }
    } catch (error) {
      enqueueSnackbar("Misslyckade att lägga review!", { variant: "error" });
    }
  };

  const handleCancel = () => {
    setFormData(initialData);
    setOpen(!open);
  };
  return (
    <DialogModal
      isOpen={open}
      title={"Lägg till ny meetup"}
      handleSubmit={handleSubmit}
      handleCancel={handleCancel}
    >
      <Grid2 p={1}>
        <TextField
          value={formData.comment}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, comment: e.target.value }))
          }
          label="Kommentar"
        />
        <Rating
          name="half-rating"
          value={formData.rating}
          precision={0.5}
          onChange={(event, newValue) => {
            setFormData((prev) => ({ ...prev, rating: newValue as number }));
          }}
        />
      </Grid2>
    </DialogModal>
  );
};

export default ReviewModal;
