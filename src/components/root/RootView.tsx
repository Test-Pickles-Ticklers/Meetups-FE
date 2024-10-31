import { Outlet } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import { Box } from "@mui/material";

const RootView = () => {
  return (
    <>
      <Navbar />
      <Box sx={{ paddingTop: "6rem" }}>
        <Outlet />
      </Box>
    </>
  );
};

export default RootView;
