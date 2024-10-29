import { Button, Divider, TextField } from "@mui/material";
import Grid from "@mui/material/Grid2";
import DialogModal from "../common/DialogModal";
import { useState } from "react";
import UserModel from "../../api/users/models/UserModel";
import { loginUser } from "../../api/users/apiUserCalls";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { setToken } = useLocalStorage();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const response = await loginUser(formData);

    if (response) {
      setToken(response.data.token);
      navigate("/meetups");
    }
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

  const initialFormData: UserModel = {
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState<UserModel>(initialFormData);

  return (
    <>
      <Button onClick={handleOpen}>Logga in</Button>
      <DialogModal
        isOpen={isOpen}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        title="Logga in här hörru"
      >
        <Grid
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
        </Grid>
      </DialogModal>
    </>
  );
};

export default Login;
