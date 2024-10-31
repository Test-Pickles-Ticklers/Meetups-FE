import axiosInstance from "../axiosInstance";
import RegisterResponse from "./models/RegisterResponse";
import AuthenticationResponse from "./models/AuthenticationResponse";
import AuthenticationRequest from "./models/AuthenticationRequest";

export const registerUser = async (
  data: AuthenticationRequest
): Promise<RegisterResponse> => {
  try {
    const response = await axiosInstance.post<RegisterResponse>(
      "/user/signup",
      data
    );
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const loginUser = async (
  data: AuthenticationRequest
): Promise<AuthenticationResponse> => {
  try {
    const response = await axiosInstance.post<AuthenticationResponse>(
      "/user/login",
      data
    );

    return response.data;
  } catch (error: any) {
    throw error;
  }
};
