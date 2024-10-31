import * as React from "react";
import { TextField, Box } from "@mui/material";

interface SearchProps {
  inputText: string;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
}


const Searchbar = ({inputText, setInputText}: SearchProps) => {
  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  return (
    <>
      <Box>
        <TextField
          value={inputText}
          onChange={inputHandler}
          placeholder="Meetups or Location"
          label="Search"
        />
      </Box>
    </>
  );
};

export default Searchbar;
