import * as React from "react";
import { TextField, Grid2, MenuItem, Select, SelectChangeEvent, InputLabel, FormControl } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";

interface SearchProps {
  inputText: string;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
  setDate: React.Dispatch<React.SetStateAction<Dayjs | null>>;
  date: Dayjs | null;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  category: string;
}

const Searchbar = ({
  inputText,
  setInputText,
  date,
  setDate,
  category,
  setCategory,
}: SearchProps) => {
  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  const dateHandler = (newDate: Dayjs | null) => {
    setDate(newDate);
  };

  const selectHandler = (e: SelectChangeEvent) => {
    setCategory(e.target.value);
    console.log(category)
  };

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
          <DatePicker
            label="Filter on date"
            value={date}
            onChange={dateHandler}
          />
        </LocalizationProvider>
        <FormControl>
        <InputLabel >Category</InputLabel>
        <Select
        labelId="category-label"
          value={category}
          label="Category"
          onChange={selectHandler}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="stök">stök</MenuItem>
          <MenuItem value="chill">chill</MenuItem>
        </Select>
        </FormControl>

        
      </Grid2>
    </>
  );
};

export default Searchbar;
