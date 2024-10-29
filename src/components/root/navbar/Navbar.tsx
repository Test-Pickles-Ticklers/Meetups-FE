import { Box, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Login from "../../auth/Login";
import { useState } from "react";
import useLocalStorage from "../../../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { loggedIn, removeToken } = useLocalStorage();

  const logout = () => {
    removeToken();
  };

  return (
    <>
      <Box width="100%">
        <Grid container>
          <Grid size={10}></Grid>
          <Grid size={2}>
            {!loggedIn ? <Login /> : <Button onClick={logout}>Logga ut</Button>}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Navbar;
