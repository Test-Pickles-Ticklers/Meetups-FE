import axiosInstance from '../axiosInstance';
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

export const signupToMeetup = async (
  id: string,
  token: string
): Promise<MeetupModel> => {
  try {
    console.log('ID and token', id, token);
    const response = await axiosInstance.put<MeetupModel>(
      `/${id}/participate`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log('Response:', response);

    return response.data;
  } catch (error: any) {
    console.log('Error', error.message);
    throw error;
  }
};
