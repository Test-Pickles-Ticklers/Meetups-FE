import Register from "../auth/Register";
import { Button } from "@mui/material";
import { useUserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const HomeView = () => {
  const { user } = useUserContext();
  const navigate = useNavigate();

  if (user) navigate("/meetups");
  return (
    <>
      <Register />
    </>
  );
};

export default HomeView;
