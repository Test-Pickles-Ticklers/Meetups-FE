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
