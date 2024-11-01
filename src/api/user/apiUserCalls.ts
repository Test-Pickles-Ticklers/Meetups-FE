import axios from "axios";
import axiosInstance from "../axiosInstance";
import MeetupModel from "../models/MeetupModel";
import ReviewModel from "../models/ReviewModel";

export const getMyMeetups = async (): Promise<MeetupModel[]> => {
  try {
    const response = await axiosInstance.get<MeetupModel[]>("/user/meetups");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserReview = async (): Promise<ReviewModel[]> => {
  try {
    const response = await axiosInstance.get<ReviewModel[]>("/user/reviews");

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
    } else {
      console.log("Unknown error:", error);
    }
    throw error;
  }
};

export const getOrganizedMeetups = async (): Promise<MeetupModel[]> => {
  try {
    const response = await axiosInstance.get<MeetupModel[]>(
      "/user/organizedMeetups"
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
