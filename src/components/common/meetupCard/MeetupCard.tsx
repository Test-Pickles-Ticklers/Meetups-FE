import MeetupModel from "../../../api/models/MeetupModel";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  CardActions,
  Grid2,
  useTheme,
} from "@mui/material";

interface MeetupCardProps {
  meetup: MeetupModel;
  handleButtonClick?: () => void;
  expandedId: string;
  toggleExpand: (id: string) => void;
  isParticipant: boolean;
  joinButtonDisabled: boolean;
  canPutReview?: boolean;
  canDelete?: boolean;
  handleReviewClick?: () => void;
}

const MeetupCard = ({
  joinButtonDisabled,
  isParticipant,
  meetup,
  handleButtonClick,
  expandedId,
  toggleExpand,
  canDelete,
  canPutReview,
  handleReviewClick,
}: MeetupCardProps) => {
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
          <Typography>Organizer: {meetup.organizer}</Typography>
          <Typography>
            Participants: {meetup.participants.length}/{meetup.maxParticipants}
          </Typography>
          <Typography>Date: {meetup.date}</Typography>
        </Grid2>
        {expandedId === meetup._id && (
          <Box sx={{ mt: 2 }}>
            <Typography
              variant="body2"
              color={theme.palette.text.secondary}
            >
              bajskuk
            </Typography>
            {canPutReview != undefined && handleReviewClick ? (
              <Button
                onClick={handleReviewClick}
                variant="contained"
                disabled={!canPutReview}
              >
                Recensera
              </Button>
            ) : (
              <Button
                onClick={handleButtonClick}
                disabled={joinButtonDisabled}
                variant="contained"
              >
                {canDelete
                  ? "Ta bort meetup"
                  : isParticipant
                  ? "Avanmäl"
                  : "Gå med"}
              </Button>
            )}
          </Box>
        )}
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() => toggleExpand(meetup._id)}
        >
          {expandedId === meetup._id ? "Visa mindre" : "Visa mer"}
        </Button>
      </CardActions>
    </Card>
  );
};

export default MeetupCard;
