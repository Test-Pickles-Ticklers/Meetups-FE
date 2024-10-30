import * as React from "react";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import MeetupList from "./List";
import { TextField, Box, Button, Typography } from "@mui/material";
import { Search } from "@mui/icons-material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  alignItem: "center",
};

const Searchbar = () => {
  const [inputText, setInputText] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={handleOpen}
        sx={{ height: "40%", width: 350 }}
      >
        <Typography letterSpacing={2.4}>Search Meetups</Typography>
        <Search />
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <TextField
            onChange={inputHandler}
            placeholder="Meetups or Location"
            label="Search"
          />

          <MeetupList input={inputText} />
        </Box>
      </Modal>
    </>
  );
};

export default Searchbar;
