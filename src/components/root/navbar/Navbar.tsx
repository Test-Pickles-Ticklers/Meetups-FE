import { AppBar, Box, Button, Grid2, Tab, Tabs, useTheme } from "@mui/material";
import Login from "../../auth/Login";
import { useUserContext } from "../../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useState, SyntheticEvent, useContext } from "react";
import ContrastIcon from "@mui/icons-material/Contrast";
import { ThemeMode } from "../../../themes/types/theme";
import { ThemeContext } from "../../../themes/themeCustomization";

const Navbar = () => {
  const { user, logout } = useUserContext();
  const navigate = useNavigate();
  const theme = useTheme();

  const [selectedTab, setSelectedTab] = useState<string>("meetups");

  const handleTabChange = (event: SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
    navigate(newValue === "meetups" ? "/meetups" : "/user");
  };
  const themeMode = useContext(ThemeContext);
  const toggleThemeMode = () => {
    themeMode.toggleThemeMode();
  };

  return (
    <AppBar
      sx={{ bgcolor: theme.palette.background.paper }}
      position="fixed"
    >
      <Grid2
        container
        height="6rem"
        alignItems="center"
        justifyContent="space-between"
        padding={2}
      >
        <Box sx={{ flexGrow: 1 }}>
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
          spacing={1}
        >
          <Button
            variant="text"
            onClick={toggleThemeMode}
          >
            <ContrastIcon />
          </Button>
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
