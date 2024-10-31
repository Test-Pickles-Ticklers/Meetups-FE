import axiosInstance from '../axiosInstance';
import ReviewModel from './models/reviewModel';
import axios from 'axios';

export const getUserReview = async (): Promise<ReviewModel[]> => {
  try {
  const response = await axiosInstance.get<ReviewModel[]>('/user/reviews');
  
    console.log('response', response);
    return response.data;
  } catch (error: unknown) {

    if (axios.isAxiosError(error)) {
      console.log('Axios error:', error.message);
    } else {
      console.log('Unknown error:', error);
    }
    throw error;
  }
};