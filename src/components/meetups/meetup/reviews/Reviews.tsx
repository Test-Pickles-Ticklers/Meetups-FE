import { useEffect, useState } from "react";
import useReviews from "../../hooks/useReviews";
import { Button, Grid2, Typography } from "@mui/material";
import AddReviewModal from "./AddReviewModal";
import AddReviewRequest from "../../../../api/reviews/models/AddReviewRequest";
import { enqueueSnackbar } from "notistack";
import ReviewCard from "../../../common/reviewCard/ReviewCard";
import { useUserContext } from "../../../../context/UserContext";

interface ReviewsProps {
  meetupId: string;
  eligableToReview: boolean;
}

const Reviews = ({ meetupId, eligableToReview }: ReviewsProps) => {
  const { reviews, reviewAdded } = useReviews(meetupId);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [hasPutReview, setHasPutReview] = useState<boolean>(false);
  const { user } = useUserContext();

  const handleAddReviewClick = () => {
    setModalOpen(true);
  };

  const handleSubmit = async (review: AddReviewRequest) => {
    try {
      const success = await reviewAdded(review);

      if (success) {
        handleCancel();
        enqueueSnackbar("Recension tillagd!", { variant: "success" });
      }
    } catch (error) {
      enqueueSnackbar("Lyckades inte lägga till recension!", {
        variant: "error",
      });
    }
  };

  const handleCancel = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    if (reviews.length > 0) {
      const putReview = reviews.find((r) => r.reviewer == user!.email);

      if (putReview != undefined) setHasPutReview(true);
    }
  }, [reviews]);

  return (
    <>
      <Grid2
        justifyContent={"center"}
        container
        mt={2}
        rowGap={2}
      >
        <Grid2
          size={12}
          container
          justifyContent={"flex-end"}
        >
          <Button
            variant={"contained"}
            onClick={handleAddReviewClick}
            disabled={!eligableToReview || hasPutReview}
          >
            Recensera
          </Button>
        </Grid2>
        <Grid2 size={4}>
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <ReviewCard
                review={review}
                isEdit={false}
              />
            ))
          ) : (
            <Typography textAlign={"center"}>
              {eligableToReview
                ? "Bli den första att recensera!"
                : "Inga reviews för denna meetup."}
            </Typography>
          )}
        </Grid2>
      </Grid2>
      <AddReviewModal
        meetupId={meetupId}
        open={modalOpen}
        handleSubmit={(review) => handleSubmit(review)}
        handleCancel={handleCancel}
      />
    </>
  );
};

export default Reviews;
