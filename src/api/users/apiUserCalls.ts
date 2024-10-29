import axiosInstance from "../axiosInstance";
import UserModel from "./models/UserModel";

export const registerUser = async (data: UserModel) => {
  try {
    console.log("data", data);
    const response = await axiosInstance.post("/user/signup", data);
    return response;
  } catch (e) {
    console.error(e);
  }
};

export const loginUser = async (data: UserModel) => {
  try {
    console.log("data", data);
    const response = await axiosInstance.post("/user/login", data);

    return response;
  } catch (e) {
    console.error(e);
  }
};
