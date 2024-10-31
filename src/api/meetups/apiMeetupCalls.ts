import axiosInstance from "../axiosInstance";
import AddMeetupRequest from "./models/AddMeetupRequest";
import MeetupModel from "../models/MeetupModel";

export const getAllMeetups = async (): Promise<MeetupModel[]> => {
  try {
    const response = await axiosInstance.get<MeetupModel[]>("/meetups");
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const addMeetup = async (meetup: AddMeetupRequest) => {
  try {
    const response = await axiosInstance.post<MeetupModel>("/meetups", meetup);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getMeetupById = async (id: string): Promise<MeetupModel> => {
  try {
    const response = await axiosInstance.get<MeetupModel>(`/meetups/${id}`);

    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const signupToMeetup = async (id: string): Promise<MeetupModel> => {
  try {
    const response = await axiosInstance.put<MeetupModel>(
      `/meetups/${id}/participate`
    );

    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const unattendToMeetup = async (id: string): Promise<MeetupModel> => {
  try {
    const response = await axiosInstance.put<MeetupModel>(
      `/meetups/${id}/cancel`
    );
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const deleteMeetup = async (id: string) => {
  try {
    const response = await axiosInstance.delete<boolean>(`/meetups/${id}`);

    if (!response.data) throw new Error();

    return response.data;
  } catch (error: any) {
    throw error;
  }
};
