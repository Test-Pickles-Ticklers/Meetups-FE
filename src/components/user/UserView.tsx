import { Grid2 } from "@mui/material";
import MeetupAttending from "./meetupAttending/MeetupAttending";
import UserReviews from "./userReviews/UserReviews";
import UserMeetups from "./userMeetups/UserMeetups";

const UserView = () => {
  return (
    <Grid2
      container
      spacing={1}
      padding={2}
    >
      <Grid2 size={4}>
        <MeetupAttending />
      </Grid2>
      <Grid2 size={4}>
        <UserReviews />
      </Grid2>
      <Grid2 size={4}>
        <UserMeetups />
      </Grid2>
    </Grid2>
  );
};
export default UserView;
