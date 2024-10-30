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

// export const getMeetupById = async (id: string) => {
//   try {
//     console.log('id', id);
//     const response = await axiosInstance.get(`/meetup/${id}`);
//     return response;
//   } catch (e) {
//     console.error(e);
//   }
// };

// export const signupToMeetup = async (id: string, token: string) => {
//   try {
//     console.log('ID and token', id, token);
//     const response = await axiosInstance.put(`/signup/${id}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return response.data;
//   } catch (e) {
//     console.error(e);
//   }
// };
