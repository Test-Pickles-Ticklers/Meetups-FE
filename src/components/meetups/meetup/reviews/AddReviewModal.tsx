import { useState } from "react";
import ReviewModel from "../../../../api/models/ReviewModel";
import useReviews from "../../hooks/useReviews";
import { useUserContext } from "../../../../context/UserContext";
import DialogModal from "../../../common/DialogModal";
import ReviewCard from "../../../common/reviewCard/ReviewCard";
import AddReviewRequest from "../../../../api/reviews/models/AddReviewRequest";
import { enqueueSnackbar } from "notistack";

interface AddReviewModalProps {
  meetupId: string;
  open: boolean;
  handleSubmit: (r: AddReviewRequest) => void;
  handleCancel: () => void;
}

const AddReviewModal = ({
  meetupId,
  open,
  handleSubmit,
  handleCancel,
}: AddReviewModalProps) => {
  const { user } = useUserContext();

  const onSubmit = () => {
    if (editReview) {
      const reviewToAdd: AddReviewRequest = {
        ...editReview,
        rating: Number(editReview.rating),
      };
      handleSubmit(reviewToAdd as AddReviewRequest);
    }
  };

  const initialData: ReviewModel = {
    _id: "",
    meetupsId: meetupId,
    reviewer: user!.email,
    comment: "",
    rating: 3,
  };

  const [editReview, setEditReview] = useState<ReviewModel | undefined>(
    initialData
  );

  return (
    <>
      <DialogModal
        isOpen={open}
        title={"Lägg till ny Review"}
        handleSubmit={onSubmit}
        handleCancel={handleCancel}
      >
        <ReviewCard
          review={initialData}
          editReview={editReview}
          setEditReview={setEditReview}
          isEdit={true}
        />
      </DialogModal>
    </>
  );
};

export default AddReviewModal;
