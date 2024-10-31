import * as React from "react";
import { TextField, Grid2} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";

interface SearchProps {
  inputText: string;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
  setDateBefore: React.Dispatch<React.SetStateAction<Dayjs | null>>;
  dateBefore: Dayjs | null;
  setDateAfter: React.Dispatch<React.SetStateAction<Dayjs | null>>;
  dateAfter: Dayjs | null;
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
}

const Searchbar = ({
  inputText,
  setInputText,
  dateBefore,
  setDateBefore,
  dateAfter,
  setDateAfter,
  // category,
  // setCategory,
}: SearchProps) => {
  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  const dateHandler1 = (newDate: Dayjs | null) => {
    setDateBefore(newDate);
    console.log(dateBefore);
  };
  const dateHandler2 = (newDate: Dayjs | null) => {
    setDateAfter(newDate);
    console.log(dateAfter);
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
          <DatePicker label="Date" value={dateBefore} onChange={dateHandler1} />
          <DatePicker label="Date" value={dateAfter} onChange={dateHandler2} />
        </LocalizationProvider>
      </Grid2>
    </>
  );
};

export default Searchbar;
