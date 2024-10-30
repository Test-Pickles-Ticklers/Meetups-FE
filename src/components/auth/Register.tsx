import {
  Box,
  Button,
  Divider,
  Grid2,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import DialogModal from "../common/DialogModal";
import UserModel from "../../api/auth/models/AuthenticationRequest";
import { useUserContext } from "../../context/UserContext";

interface RegisterModel extends UserModel {
  confirmPassword: string;
}

const Register = () => {
  const { register } = useUserContext();
  const initialFormData: RegisterModel = {
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [formData, setFormData] = useState<RegisterModel>(initialFormData);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [errors, setErrors] = useState<string>("");

  const handleSubmit = async () => {
    const success = await register(formData);

    if (success) handleOpen();
    if (!success) setErrors("Mailaddress verkar vara registrerad.");
  };

  const handleCancel = () => {
    setFormData(initialFormData);
    handleOpen();
    setErrors("");
  };

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        marginBottom={2}
        marginTop={20}
      >
        <Button
          onClick={handleOpen}
          variant="contained"
        >
          Registrera dig
        </Button>
      </Box>
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
        <Typography color="red">{errors}</Typography>
      </DialogModal>
    </>
  );
};

export default Register;
