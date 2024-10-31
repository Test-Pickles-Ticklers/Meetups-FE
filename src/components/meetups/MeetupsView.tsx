import { useEffect, useState } from "react";
import { getAllMeetups } from "../../api/meetups/apiMeetupCalls";
import MeetupModel from "../../api/meetups/models/MeetupModel";
import AddMeetupModal from "./addMeetupModal/AddMeetupModal";
import { Grid2 } from "@mui/material";
import MeetupCard from "./meetupCard/MeetupCard";
import Searchbar from "../searchbar/Searchbar";
import useMeetups from "./hooks/useMeetups";

const MeetupsView = () => {
  //const [data, setData] = useState<MeetupModel[]>([]);
  const [expandedMeetupId, setExpandedMeetupId] = useState<string>("");
  const [inputText, setInputText] = useState("")
  const { meetups } = useMeetups();


  // const fetchData = async () => {
  //   try {
  //     const response = await getAllMeetups();
  //     console.log("Meetups data:", response);


  //     setData(response);
  //   } catch (error: any) {
  //     console.error("Error fetching meetups:", error.message || error);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  const filteredData = meetups.length ? meetups.filter((el) => {
    if (inputText === "") {
      return el;
    } else {
      return (
        el.title.toLowerCase().includes(inputText) ||
        el.location.toLowerCase().includes(inputText)
      );
    }
  }) : [];

  const toggleExpand = (id: string) => {
    setExpandedMeetupId((prevId) => (prevId === id ? "" : id));
  };

  const handleJoin = () => {};

  return (
    <>
      <AddMeetupModal />
      <Searchbar inputText={inputText} setInputText={setInputText} />
      <Grid2
        container
        spacing={2}
        direction={"column"}
        alignItems={"center"}
      >
        {filteredData.length > 0 ? (
          filteredData.map((meetup) => {
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
