import { useEffect, useState } from "react";
import { getAllMeetups } from "../../api/meetups/apiMeetupCalls";
import MeetupModel from "../../api/meetups/models/MeetupModel";
import AddMeetupModal from "./addMeetupModal/AddMeetupModal";
import { Grid2 } from "@mui/material";
import MeetupCard from "./meetupCard/MeetupCard";

const MeetupsView = () => {
  const [data, setData] = useState<MeetupModel[]>([]);
  const [expandedMeetupId, setExpandedMeetupId] = useState<string>("");

  const fetchData = async () => {
    try {
      const response = await getAllMeetups();

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
                key={meetup._id}
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
