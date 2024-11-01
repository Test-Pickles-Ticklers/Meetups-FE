import { useState } from "react";

import AddMeetupModal from "./addMeetupModal/AddMeetupModal";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid2,
  Paper,
  Typography,
} from "@mui/material";
import useMeetups from "./hooks/useMeetups";
import { Dayjs } from "dayjs";
import MeetupCard from "../common/meetupCard/MeetupCard";
import Searchbar from "./searchbar/Searchbar";
import { SearchFilters } from "./searchbar/Searchfilters";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const MeetupsView = () => {
  const [dateBefore, setDateBefore] = useState<Dayjs | null>(null);
  const [dateAfter, setDateAfter] = useState<Dayjs | null>(null);
  const [category, setCategory] = useState("");
  const [inputText, setInputText] = useState("");
  const { getMeetups, upcomingMeetups, historicMeetups } = useMeetups();

  const displayedMeetups = SearchFilters(
    upcomingMeetups,
    inputText,
    dateBefore,
    dateAfter,
    category
  );

  return (
    <Grid2 p={2}>
      <Grid2
        container
        justifyContent={"center"}
        gap={2}
      >
        <AddMeetupModal addedModalTrigger={getMeetups} />
        <Grid2 size={10}>
          <Searchbar
            inputText={inputText}
            setInputText={setInputText}
            fromDate={dateBefore}
            setDateBefore={setDateBefore}
            toDate={dateAfter}
            setDateAfter={setDateAfter}
            category={category}
            setCategory={setCategory}
          />
        </Grid2>
        <Grid2 size={5}>
          <Grid2
            container
            spacing={2}
            direction={"column"}
            alignItems={"center"}
          >
            <Paper sx={{ padding: 2 }}>
              <Typography
                variant="h4"
                mb={4}
              >
                Kommande meetups
              </Typography>
              {displayedMeetups.length > 0 ? (
                displayedMeetups.map((meetup) => (
                  <Grid2
                    size={12}
                    p={1}
                  >
                    <MeetupCard meetup={meetup} />
                  </Grid2>
                ))
              ) : (
                <Typography>Inga kommande meetups.</Typography>
              )}
            </Paper>
          </Grid2>
        </Grid2>
        <Grid2 size={5}>
          <Grid2
            container
            spacing={2}
            direction={"column"}
            alignItems={"center"}
          >
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography variant="h4">Gamla meetups</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {historicMeetups.length > 0 ? (
                  historicMeetups.map((meetup) => (
                    <Grid2
                      size={12}
                      p={1}
                    >
                      <MeetupCard meetup={meetup} />
                    </Grid2>
                  ))
                ) : (
                  <Typography>Inga gamla meetups.</Typography>
                )}
              </AccordionDetails>
            </Accordion>
          </Grid2>
        </Grid2>
      </Grid2>
    </Grid2>
  );
};

export default MeetupsView;
