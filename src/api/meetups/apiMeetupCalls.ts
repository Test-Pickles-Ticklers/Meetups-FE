import axiosInstance from '../axiosInstance';
import AddMeetupRequest from './models/AddMeetupRequest';
import MeetupModel from './models/MeetupModel';

export const getAllMeetups = async (): Promise<MeetupModel[]> => {
  try {
    const response = await axiosInstance.get<MeetupModel[]>('/meetups');
    console.log('response', response);
    return response.data;
  } catch (error: any) {
    console.log('Error', error.message);
    throw error;
  }
};

export const addMeetup = async (meetup: AddMeetupRequest) => {
  try {
    console.log('meetup', meetup);
    const response = await axiosInstance.post<MeetupModel>('/meetups', meetup);
    console.log('axiosInstance', axiosInstance);
    console.log('response', response);
    return response.data;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
};

export const getMeetupById = async (id: string): Promise<MeetupModel> => {
  try {
    console.log('id', id);
    const response = await axiosInstance.get<MeetupModel>(`/meetups/${id}`);
    console.log('Response:', response);

    return response.data;
  } catch (error: any) {
    console.log('Error', error.message);
    throw error;
  }
};

export const signupToMeetup = async (id: string): Promise<MeetupModel> => {
  try {
    console.log('ID:', id);
    const response = await axiosInstance.put<MeetupModel>(
      `/meetups/${id}/participate`
    );
    console.log('Response:', response);

    return response.data;
  } catch (error: any) {
    console.log('Error', error.message);
    throw error;
  }
};

export const unattendToMeetup = async (id: string): Promise<MeetupModel> => {
  try {
    console.log('ID:', id);
    const response = await axiosInstance.put<MeetupModel>(
      `/meetups/${id}/cancel`
    );
    console.log('Response:', response);
    return response.data;
  } catch (error: any) {
    console.log('Error', error.message);
    throw error;
  }
};
