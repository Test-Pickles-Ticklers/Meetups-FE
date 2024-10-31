import React from "react";
import ReviewModel from "../../../../api/models/ReviewModel";
import { Card, CardContent, Grid2, Typography } from "@mui/material";
import dayjs from "dayjs";

interface ReviewCardProps {
  review: ReviewModel;
}
const ReviewCard = ({ review }: ReviewCardProps) => {
  return (
    <Card>
      <CardContent>
        <Grid2
          container
          spacing={1}
        >
          <Grid2 size={4}>
            <Typography fontWeight={700}>Recenserare:</Typography>
          </Grid2>
          <Grid2 size={7}>
            <Typography>{review.reviewer}</Typography>
          </Grid2>
          <Grid2 size={4}>
            <Typography fontWeight={700}>Kommentar:</Typography>
          </Grid2>
          <Grid2 size={7}>
            <Typography>{review.comment}</Typography>
          </Grid2>
          <Grid2 size={4}>
            <Typography fontWeight={700}>Betyg:</Typography>
          </Grid2>
          <Grid2 size={7}>
            <Typography>{review.rating}</Typography>
          </Grid2>
          <Grid2 size={4}>
            <Typography fontWeight={700}>Skapad:</Typography>
          </Grid2>
          <Grid2 size={7}>
            <Typography>
              {dayjs(review.createdAt).format("YYYY-MM-DD")}
            </Typography>
          </Grid2>
        </Grid2>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
