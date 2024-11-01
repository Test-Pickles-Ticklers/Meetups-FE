import React, { Dispatch, SetStateAction } from "react";
import ReviewModel from "../../../api/models/ReviewModel";
import { Card, CardContent, Grid2, Typography } from "@mui/material";
import ViewEditTextField from "../viewEditInput/viewEditTextField";
import ViewEditRatingField from "../viewEditInput/viewEditReviewField";

interface ReviewCardProps {
  review: ReviewModel;
  editReview?: ReviewModel;
  setEditReview?: Dispatch<SetStateAction<ReviewModel | undefined>>;
  isEdit: boolean;
}

const ReviewCard = ({
  review,
  editReview,
  setEditReview,
  isEdit,
}: ReviewCardProps) => {
  console.log("review", review);
  return (
    <Card key={review._id}>
      <CardContent>
        <Grid2
          container
          direction="column"
          alignItems="center"
          rowGap={2}
          padding={1}
        >
          <Grid2 size={12}>
            <ViewEditTextField
              isEdit={false}
              handleChange={(value: string) => console.log(value)}
              label={"Recensent"}
              value={editReview ? editReview.reviewer : review.reviewer}
            />
          </Grid2>
          <Grid2 size={12}>
            <ViewEditRatingField
              isEdit={isEdit}
              handleChange={(value: number) =>
                setEditReview!((prev) => ({
                  ...prev!,
                  rating: value,
                }))
              }
              value={editReview ? editReview.rating : review.rating}
            />
          </Grid2>
          <Grid2 size={12}>
            <ViewEditTextField
              isEdit={isEdit}
              handleChange={(value: string) =>
                setEditReview!((prev) => ({
                  ...prev!,
                  comment: value,
                }))
              }
              label={"Kommentar"}
              value={editReview ? editReview.comment : review.comment}
            />
          </Grid2>
        </Grid2>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
