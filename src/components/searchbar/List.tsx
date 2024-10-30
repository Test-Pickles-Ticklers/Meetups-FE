import {
  Button,
  ListItem,
  List,
  Typography,
  Box,
  Card,
  CardActions,
  CardContent,
} from "@mui/material";
import useMeetups from "../meetups/hooks/useMeetups";
import { useState } from "react";

interface ListProps {
  input: string;
}

function MeetupList(props: ListProps) {
  const [expandedMeetupId, setExpandedMeetupId] = useState<string | null>(null);
  const { meetups } = useMeetups();

  const toggleExpand = (id: string) => {
    setExpandedMeetupId((prevId) => (prevId === id ? null : id));
  };

  const filteredData = meetups.length
    ? meetups.filter((el) => {
        if (props.input === "") {
          return el;
        } else {
          return (
            el.title.toLowerCase().includes(props.input) ||
            el.location.toLowerCase().includes(props.input)
          );
        }
      })
    : [];

  return (
    <List style={{ listStyleType: "none", padding: "0", margin: "0" }}>
      {filteredData.map((item) => (
        <ListItem key={item._id}>
          <Card
            sx={{
              width: {
                xs: "90%",
                sm: 850,
              },
              margin: 1,
              justifySelf: "center",
              marginTop: 3,
              transition: "max-height 0.3s ease-in-out",
              overflow: "hidden",
            }}
          >
            <CardContent sx={{ marginLeft: 1, marginRight: 1 }}>
              <Typography variant="h5" component="div" align="center">
                {item.title}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  color: "text.secondary",
                  mt: 1,
                }}
              >
                <Typography>Organizer: {item.organizer}</Typography>
                <Typography>
                  Participants: {item.participants.length} /{" "}
                  {item.maxParticipants}
                </Typography>
                <Typography>Date: {item.date}</Typography>
              </Box>
              {expandedMeetupId === item._id && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Description: Ekorrfamiljen, är en stor familj bland
                    gnagarna. Den finns representerad på alla kontinenter utom
                    Australien, Nya Guinea, Madagaskar och Antarktis. Dessutom
                    saknas de i vissa öknar. Enligt Mammal Species of the World
                    listas 51 släkten med tillsammans 270 till 280 arter i
                    familjen men systematiken är delvis oklar :)
                  </Typography>
                  <Button variant="contained" sx={{ mt: 3 }}>
                    Join Meetup
                  </Button>
                </Box>
              )}
            </CardContent>
            <CardActions
              sx={{
                ml: 2.5,
                mr: 1,
                p: 0,
              }}
            >
              <Button size="small" onClick={() => toggleExpand(item._id)}>
                {expandedMeetupId === item._id ? "Show Less" : "Learn More"}
              </Button>
            </CardActions>
          </Card>
        </ListItem>
      ))}
    </List>
  );
}

export default MeetupList;
