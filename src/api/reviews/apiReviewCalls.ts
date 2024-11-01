import axiosInstance from "../axiosInstance";
import ReviewModel from "../models/ReviewModel";
import AddReviewRequest from "./models/AddReviewRequest";

export const addReview = async (
  meetupsId: string,
  review: AddReviewRequest
) => {
  try {
    const response = await axiosInstance.post<ReviewModel>(
      `/review/${meetupsId}`,
      review
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getReviews = async (meetupsId: string) => {
  try {
    const response = await axiosInstance.get<ReviewModel[]>(
      `/review/${meetupsId}`
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};
