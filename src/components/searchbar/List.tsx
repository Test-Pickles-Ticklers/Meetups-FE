import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AccordionActions,
  Button,
  ListItem,
  List,
  Typography
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import data from "./mockdata.json";


interface ListProps {
  input: string;
}


const style = {
    width: "100%",
}

function MeetupList(props: ListProps) {
  const filteredData = data.filter((el) => {
    if (props.input === "") {
      return el;
    } else {
      return (
        el.title.toLowerCase().includes(props.input) ||
        el.location.toLowerCase().includes(props.input)
      );
    }
  });

  return (

    <List style={{ listStyleType: "none", padding: "0", margin: "0" }}>
        {filteredData.map((item) => (
          <ListItem key={item.id}>
            <Accordion sx={style}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3-content"
                id="panel3-header"
              >
                <Typography variant="h2">{item.title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>Organizer: {item.organizer}</Typography>
                <Typography>Date: {item.date}</Typography>
                <Typography>Time: {item.time}</Typography>
                <Typography>Location: {item.location}</Typography>
              </AccordionDetails>
              <AccordionActions>
                <Button>Cancel Partake</Button>
                <Button>Signup</Button>
              </AccordionActions>
            </Accordion>
          </ListItem>
        ))}
      </List>
  );
}


export default MeetupList;
