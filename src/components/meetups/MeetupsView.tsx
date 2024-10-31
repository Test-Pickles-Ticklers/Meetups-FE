import { useEffect, useState } from "react";
import { getAllMeetups } from "../../api/meetups/apiMeetupCalls";
import MeetupModel from "../../api/meetups/models/MeetupModel";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddMeetupModal from "./addMeetupModal/AddMeetupModal";
import { Grid2 } from "@mui/material";
import MeetupCard from "./meetupCard/MeetupCard";

const MeetupsView = () => {
  const [data, setData] = useState<MeetupModel[]>([]);
  const [expandedMeetupId, setExpandedMeetupId] = useState<string>("");

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
    setExpandedMeetupId((prevId) => (prevId === id ? "" : id));
  };

  const handleJoin = () => {};

  return (
    <>
      <AddMeetupModal />
      <Grid2
        container
        spacing={2}
        direction={"column"}
        alignItems={"center"}
      >
        {data.length > 0 ? (
          data.map((meetup) => {
            return (
              <Grid2
                size={6}
                p={1}
              >
                <MeetupCard
                  meetup={meetup}
                  handleJoinClick={handleJoin}
                  expandedId={expandedMeetupId}
                  toggleExpand={(id: string) => toggleExpand(id)}
                />
              </Grid2>
            );
          })
        ) : (
          <p>No meetups found.</p>
        )}
      </Grid2>
    </>
  );
};

export default MeetupsView;
