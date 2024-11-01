import React, { useEffect, useState } from "react";
import ReviewModel from "../../../api/models/ReviewModel";
import { Box, Card, Grid2, Typography, useTheme } from "@mui/material";
import { getUserReview } from "../../../api/user/apiUserCalls";
import ReviewCard from "../../common/reviewCard/ReviewCard";

const UserReviews = () => {
  const theme = useTheme();
  const [data, setData] = useState<ReviewModel[]>([]);

  const fetchData = async () => {
    try {
      const response = await getUserReview();

      setData(response);
    } catch (error: any) {
      console.error("Error fetching user reviews:", error.message || error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box bgcolor={theme.palette.background.paper}>
      <Grid2
        container
        spacing={1}
        direction={"column"}
        padding={1}
      >
        <Typography
          textAlign={"center"}
          variant="h5"
          width="100%"
        >
          Recensioner
        </Typography>
        {data.length > 0 ? (
          data.map((review) => (
            <ReviewCard
              key={review._id}
              review={review}
              isEdit={false}
            />
          ))
        ) : (
          <p>Inga recensioner tillgängliga.</p>
        )}
      </Grid2>
    </Box>
  );
};

export default UserReviews;
