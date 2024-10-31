import axiosInstance from "../axiosInstance";
import AddMeetupRequest from "./models/AddMeetupRequest";
import MeetupModel from "../models/MeetupModel";
import UpdateMeetupRequest from "./models/UpdateMeetupRequest";

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
    await axiosInstance.post<MeetupModel>("/meetups", meetup);
    return true;
  } catch (error) {
    throw error;
  }
};

export const updateMeetup = async (
  id: string,
  meetup: UpdateMeetupRequest
): Promise<MeetupModel> => {
  try {
    const response = await axiosInstance.put<MeetupModel>(
      `/meetups/${id}`,
      meetup
    );

    return response.data;
  } catch (error: any) {
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
