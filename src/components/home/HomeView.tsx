import Register from "../auth/Register";
import { Button } from "@mui/material";
import { useUserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const HomeView = () => {
  const { user } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/meetups");
  }, [user]);

  return (
    <>
      <Register />
    </>
  );
};

export default HomeView;
