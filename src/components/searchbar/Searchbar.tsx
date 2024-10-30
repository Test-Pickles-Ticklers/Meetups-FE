import * as React from "react";
import { useState } from "react";
import MeetupList from "./List";
import { TextField, Box, } from "@mui/material";


const style = {
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  alignItem: "center",
};

const Searchbar = () => {
  const [inputText, setInputText] = useState("");

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  return (
    <>
        <Box sx={style}>
          <TextField
            onChange={inputHandler}
            placeholder="Meetups or Location"
            label="Search"
          />

          <MeetupList input={inputText} />
        </Box>
    </>
  );
};

export default Searchbar;
