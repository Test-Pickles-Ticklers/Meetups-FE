import { Box, Button, Grid2 } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Login from "../../auth/Login";
import HomeIcon from "@mui/icons-material/Home";
import { useUserContext } from "../../../context/UserContext";

const Navbar = () => {
  const { user, logout } = useUserContext();

  return (
    <Box width="100%">
      <Grid2
        container
        height="6rem"
        alignItems="center"
      >
        <Grid
          size={10}
          container
          alignItems="center"
        >
          <Grid size={1}>
            <HomeIcon style={{ marginLeft: "3rem" }} />
          </Grid>
        </Grid>
        <Grid
          size={2}
          container
          alignContent="center"
        >
          {!user ? <Login /> : <Button onClick={logout}>Logga ut</Button>}
        </Grid>
      </Grid2>
    </Box>
  );
};
export default Navbar;
