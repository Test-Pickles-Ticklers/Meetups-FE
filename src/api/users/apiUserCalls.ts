import { enqueueSnackbar, VariantType } from "notistack";
import axiosInstance from "../axiosInstance";
import UserModel from "./models/UserModel";
import { AxiosError } from "axios";

export const registerUser = async (data: UserModel) => {
  try {
    console.log("data", data);
    const response = await axiosInstance.post("/user/signup", data);
    return response;
  } catch (error: any) {
    enqueueSnackbar(error.message, { variant: "error" });
  }
};

export const loginUser = async (data: UserModel) => {
  try {
    console.log("data", data);
    const response = await axiosInstance.post("/user/login", data);

    return response;
  } catch (error: any) {
    enqueueSnackbar(error.message, { variant: "error" });
  }
};
