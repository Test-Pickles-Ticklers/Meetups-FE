import * as React from "react";
import { TextField, Grid2, MenuItem } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";

interface SearchProps {
  inputText: string;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
  setDate1: React.Dispatch<React.SetStateAction<Dayjs | null>>;
  date1: Dayjs | null;
  setDate2: React.Dispatch<React.SetStateAction<Dayjs | null>>;
  date2: Dayjs | null;
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
}

const Searchbar = ({
  inputText,
  setInputText,
  date1,
  setDate1,
  date2,
  setDate2,
  // category,
  // setCategory,
}: SearchProps) => {
  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  const dateHandler1 = (newDate: Dayjs | null) => {
    setDate1(newDate);
    console.log(date1);
  };
  const dateHandler2 = (newDate: Dayjs | null) => {
    setDate2(newDate);
    console.log(date2);
  };
  
  // const categoryHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  //   setCategory(e.target.value);
  //   console.log(category);
  // }


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
          <DatePicker label="Date" value={date1} onChange={dateHandler1} />
          <DatePicker label="Date" value={date2} onChange={dateHandler2} />
        </LocalizationProvider>
      </Grid2>
    </>
  );
};

export default Searchbar;
