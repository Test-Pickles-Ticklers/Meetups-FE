import { useEffect, useState } from "react";
import { getAllMeetups } from "../../api/meetups/apiMeetupCalls";
import MeetupModel from "../../api/meetups/models/MeetupModel";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const MeetupsView = () => {
  const [data, setData] = useState<MeetupModel[]>([]);
  const [expandedMeetupId, setExpandedMeetupId] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const response = await getAllMeetups();
      console.log("Meetups data:", response);
      setData(response);
    } catch (error: any) {
      console.error("Error fetching meetups:", error.message || error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toggleExpand = (id: string) => {
    setExpandedMeetupId((prevId) => (prevId === id ? null : id));
  };

  return (
    <>
      {data.length > 0 ? (
        data.map((meetup) => {
          return (
            <div key={meetup._id}>
              <Card
                sx={{
                  width: {
                    xs: "90%", // Full width on extra-small screens
                    sm: 850, // Fixed width on small screens and above
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
                    {meetup.title}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      color: "text.secondary",
                      mt: 1,
                    }}
                  >
                    <Typography>Organizer: {meetup.organizer}</Typography>
                    <Typography>
                      Participants: {meetup.participants.length} /{" "}
                      {meetup.maxparticipants}
                    </Typography>
                    <Typography>Date: {meetup.date}</Typography>
                  </Box>
                  {expandedMeetupId === meetup._id && (
                    <Box sx={{ mt: 2 }}>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        Description: Ekorrfamiljen, är en stor familj bland
                        gnagarna. Den finns representerad på alla kontinenter
                        utom Australien, Nya Guinea, Madagaskar och Antarktis.
                        Dessutom saknas de i vissa öknar. Enligt Mammal Species
                        of the World listas 51 släkten med tillsammans 270 till
                        280 arter i familjen men systematiken är delvis oklar :)
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
                  <Button size="small" onClick={() => toggleExpand(meetup._id)}>
                    {expandedMeetupId === meetup._id
                      ? "Show Less"
                      : "Learn More"}
                  </Button>
                </CardActions>
              </Card>
            </div>
          );
        })
      ) : (
        <p>No meetups found.</p>
      )}
    </>
  );
};

export default MeetupsView;
