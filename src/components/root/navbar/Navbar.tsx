import {
  AppBar,
  Box,
  Breadcrumbs,
  Button,
  Grid2,
  SelectProps,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from "@mui/material";
import Login from "../../auth/Login";
import { useUserContext } from "../../../context/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import { useState, SyntheticEvent, useContext } from "react";
import ContrastIcon from "@mui/icons-material/Contrast";
import { ThemeContext } from "../../../themes/themeCustomization";
import Link from "@mui/material/Link";

const Navbar = () => {
  const { user, logout } = useUserContext();
  const navigate = useNavigate();
  const theme = useTheme();
  const { id } = useParams();

  const [selectedTab, setSelectedTab] = useState<string>("meetups");

  const handleTabChange = (event: SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
    navigate(newValue === "meetups" ? "/meetups" : "/user");
  };
  const themeMode = useContext(ThemeContext);
  const toggleThemeMode = () => {
    themeMode.toggleThemeMode();
  };

  const tabs: SelectProps[] = [
    {
      label: "Meetups",
      value: "meetups",
    },
    {
      label: "Min Profil",
      value: "user",
    },
  ];

  const handleBreadcrumbClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    navigate(`/${selectedTab}`);
  };

  return (
    <>
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
                {tabs.map((tab) => (
                  <Tab
                    label={tab.label}
                    value={tab.value}
                  />
                ))}
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
      <Grid2
        marginTop="6rem"
        padding={2}
      >
        <Breadcrumbs onClick={handleBreadcrumbClick}>
          {id ? (
            <Grid2
              direction={"row"}
              container
              spacing={1}
            >
              <Link
                underline="hover"
                color="inherit"
                sx={{ cursor: "pointer" }}
              >
                {tabs.find((tab) => tab.value == selectedTab)!.label}
              </Link>
              <Typography sx={{ color: "text.primary", cursor: "default" }}>
                / Meetup
              </Typography>
            </Grid2>
          ) : (
            <Typography sx={{ color: "text.primary", cursor: "default" }}>
              {tabs.find((tab) => tab.value == selectedTab)!.label}
            </Typography>
          )}
        </Breadcrumbs>
      </Grid2>
    </>
  );
};
export default Navbar;
