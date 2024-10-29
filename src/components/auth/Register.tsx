import { Button, Divider, Grid2, TextField } from "@mui/material";
import { useState } from "react";
import DialogModal from "../common/DialogModal";
import UserModel from "../../api/users/models/UserModel";
import { registerUser } from "../../api/users/apiUserCalls";

interface RegisterModel extends UserModel {
  confirmPassword: string;
}

const Register = () => {
  const initialFormData: RegisterModel = {
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [formData, setFormData] = useState<RegisterModel>(initialFormData);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSubmit = async () => {
    const data = await registerUser(formData as UserModel);
    console.log("data", data);
    handleOpen();
  };
  const handleCancel = () => {
    console.log("initialFormData", initialFormData);
    setFormData(initialFormData);
    handleOpen();
  };
  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Button onClick={handleOpen}>Registrera dig</Button>
      <DialogModal
        isOpen={isOpen}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        title="Willk0mmen"
      >
        <Grid2
          container
          direction={"column"}
          gap={2}
          marginTop={2}
        >
          <Divider />
          <TextField
            label="Email"
            onChange={(e: any) => {
              setFormData((prevState) => ({
                ...prevState,
                email: e.target.value,
              }));
            }}
            value={formData.email}
          />
          <TextField
            label="Lösenord"
            type={"password"}
            onChange={(e: any) => {
              setFormData((prevState) => ({
                ...prevState,
                password: e.target.value,
              }));
            }}
            value={formData.password}
          />
          <TextField
            label="Bekräfta lösenord"
            type={"password"}
            onChange={(e: any) => {
              setFormData((prevState) => ({
                ...prevState,
                confirmPassword: e.target.value,
              }));
            }}
            value={formData.confirmPassword}
          />
        </Grid2>
      </DialogModal>
    </>
  );
};

export default Register;
