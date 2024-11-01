import { useNavigate } from "react-router-dom";
import MeetupModel from "../../../api/models/MeetupModel";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
  Grid2,
  useTheme,
} from "@mui/material";

interface MeetupCardProps {
  meetup: MeetupModel;
}

const MeetupCard = ({ meetup }: MeetupCardProps) => {
  const navigate = useNavigate();
  const theme = useTheme();
  return (
    <Card key={meetup._id}>
      <CardContent>
        <Typography
          variant="h5"
          component="div"
          align="center"
        >
          {meetup.title}
        </Typography>
        <Grid2
          container
          justifyContent={"space-between"}
          color={theme.palette.text.secondary}
        >
          <Typography>Ansvarig: {meetup.organizer}</Typography>
          <Typography>
            Deltagare: {meetup.participants.length}/{meetup.maxParticipants}
          </Typography>
          <Typography>Datum: {meetup.date}</Typography>
        </Grid2>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() => navigate(`/meetups/${meetup._id}`)}
        >
          Gå till meetup
        </Button>
      </CardActions>
    </Card>
  );
};

export default MeetupCard;
