import { AppBar, Box, Button, Grid2, Tab, Tabs, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Login from "../../auth/Login";
import HomeIcon from "@mui/icons-material/Home";
import { useUserContext } from "../../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useState, SyntheticEvent } from "react";

const Navbar = () => {
  const { user, logout } = useUserContext();
  const navigate = useNavigate();
  const theme = useTheme();

  const [selectedTab, setSelectedTab] = useState<string>("meetups");

  const handleTabChange = (event: SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
    navigate(newValue === "meetups" ? "/meetups" : "/user");
  };

  return (
    <AppBar
      sx={{ bgcolor: theme.palette.primary.light }}
      position="fixed"
    >
      <Grid2
        container
        height="6rem"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box
          sx={{ flexGrow: 1 }}
          paddingLeft={2}
        >
          {user ? (
            <Tabs
              value={selectedTab}
              onChange={handleTabChange}
              textColor="inherit"
              indicatorColor="primary"
            >
              <Tab
                label="Meetups"
                value="meetups"
              />
              <Tab
                label="Min Profil"
                value="user"
              />
            </Tabs>
          ) : null}
        </Box>
        <Grid2
          container
          alignItems="center"
          justifyContent="flex-end"
          sx={{ mr: 2 }}
        >
          {!user ? (
            <Login />
          ) : (
            <Button
              onClick={() => {
                setSelectedTab("meetups");
                logout();
              }}
              variant="contained"
            >
              Logga ut
            </Button>
          )}
        </Grid2>
      </Grid2>
    </AppBar>
  );
};
export default Navbar;
