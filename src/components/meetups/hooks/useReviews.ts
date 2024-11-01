import { useEffect, useState } from "react";
import ReviewModel from "../../../api/models/ReviewModel";
import { addReview, getReviews } from "../../../api/reviews/apiReviewCalls";
import { enqueueSnackbar } from "notistack";
import AddReviewRequest from "../../../api/reviews/models/AddReviewRequest";

const useReviews = (meetupId: string) => {
  const [reviews, setReviews] = useState<ReviewModel[]>([]);

  const fetch = async () => {
    try {
      const data = await getReviews(meetupId);
      setReviews(data);
    } catch (error) {
      enqueueSnackbar("Fel vid inhämtning av recensioner", {
        variant: "error",
      });
    }
  };

  const reviewAdded = async (review: AddReviewRequest): Promise<boolean> => {
    try {
      await addReview(meetupId, review);

      await fetch();
      return true;
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    fetch();
  }, [meetupId]);

  return {
    reviews,
    reviewAdded,
  };
};

export default useReviews;
