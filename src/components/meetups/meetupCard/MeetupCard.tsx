import React from 'react';
import MeetupModel from '../../../api/meetups/models/MeetupModel';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  CardActions,
  Grid2,
  useTheme,
} from '@mui/material';

interface MeetupCardProps {
  meetup: MeetupModel;
  handleJoinClick: () => void;
  expandedId: string;
  toggleExpand: (id: string) => void;
  isParticipant: boolean;
  joinButtonDisabled: boolean;
}

const MeetupCard = ({
  joinButtonDisabled,
  isParticipant,
  meetup,
  handleJoinClick,
  expandedId,
  toggleExpand,
}: MeetupCardProps) => {
  const theme = useTheme();
  return (
    <Card key={meetup._id}>
      <CardContent>
        <Typography variant="h5" component="div" align="center">
          {meetup.title}
        </Typography>
        <Grid2
          container
          justifyContent={'space-between'}
          color={theme.palette.text.secondary}
        >
          <Typography>Organizer: {meetup.organizer}</Typography>
          <Typography>
            Participants: {meetup.participants.length} /{' '}
            {meetup.maxParticipants}
          </Typography>
          <Typography>Date: {meetup.date}</Typography>
        </Grid2>
        {expandedId === meetup._id && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color={theme.palette.text.secondary}>
              Description: Ekorrfamiljen, är en stor familj bland gnagarna. Den
              finns representerad på alla kontinenter utom Australien, Nya
              Guinea, Madagaskar och Antarktis. Dessutom saknas de i vissa
              öknar. Enligt Mammal Species of the World listas 51 släkten med
              tillsammans 270 till 280 arter i familjen men systematiken är
              delvis oklar :)
            </Typography>
            <Button
              onClick={handleJoinClick}
              disabled={joinButtonDisabled}
              variant="contained"
            >
              {isParticipant ? 'Avanmäl' : 'Gå med'}
            </Button>
          </Box>
        )}
      </CardContent>
      <CardActions

      // sx={{
      //   ml: 2.5,
      //   mr: 1,
      //   p: 0,
      // }}
      >
        <Button size="small" onClick={() => toggleExpand(meetup._id)}>
          {expandedId === meetup._id ? 'Show Less' : 'Learn More'}
        </Button>
      </CardActions>
    </Card>
  );
};

export default MeetupCard;
