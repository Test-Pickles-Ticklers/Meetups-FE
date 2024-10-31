import * as React from "react";
import { TextField, Grid2 } from "@mui/material";
import { DateField, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";

interface SearchProps {
  inputText: string;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
  setDate: React.Dispatch<React.SetStateAction<Dayjs | null>>;
  date: Dayjs | null;
}

const Searchbar = ({ inputText, setInputText, date, setDate }: SearchProps) => {
  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  const dateHandler = (newDate: Dayjs | null) => {
    setDate(newDate);
  }

  return (
    <>
      <Grid2 container spacing={2}>
        <TextField
          value={inputText}
          onChange={inputHandler}
          placeholder="Meetups or Location"
          label="Search"
        />
        
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateField label="Filter on date" value={date} onChange={dateHandler} />
    </LocalizationProvider>
      </Grid2>
    </>
  );
};

export default Searchbar;
