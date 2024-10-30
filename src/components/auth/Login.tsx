import { Button, Divider, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import DialogModal from "../common/DialogModal";
import { useState } from "react";
import AuthenticationRequest from "../../api/auth/models/AuthenticationRequest";
import { useUserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [errors, setErrors] = useState<string>("");
  const navigate = useNavigate();
  const { login } = useUserContext();
  const initialFormData: AuthenticationRequest = {
    email: "",
    password: "",
  };

  const [formData, setFormData] =
    useState<AuthenticationRequest>(initialFormData);

  const handleSubmit = async () => {
    const success = await login(formData);

    if (success) {
      navigate("/meetups");
      handleOpen();
      setFormData(initialFormData);
      setErrors("");
    }
    if (!success) setErrors("Fel användarnamn eller lösenord.");
  };

  const handleCancel = () => {
    setErrors("");
    setFormData(initialFormData);
    handleOpen();
  };
  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        sx={{ height: "40%", width: "20" }}
        variant="contained"
      >
        Logga in
      </Button>
      <DialogModal
        isOpen={isOpen}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        title="Logga in här hörru"
      >
        <Grid container direction={"column"} gap={2} marginTop={2}>
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
          ></TextField>
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
          ></TextField>
          <Typography color={"red"}>{errors}</Typography>
        </Grid>
      </DialogModal>
    </>
  );
};

export default Login;
