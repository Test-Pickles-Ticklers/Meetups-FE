import * as React from "react";
import {
  TextField,
  Grid2,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import MeetupCategories from "../../../api/models/MeetupCategories";
import ViewEditSelectField from "../../common/viewEditInput/viewEditSelectField";

interface SearchProps {
  inputText: string;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
  setDateBefore: React.Dispatch<React.SetStateAction<Dayjs | null>>;
  fromDate: Dayjs | null;
  setDateAfter: React.Dispatch<React.SetStateAction<Dayjs | null>>;
  toDate: Dayjs | null;
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
}

const Searchbar = ({
  inputText,
  setInputText,
  fromDate,
  setDateBefore,
  toDate,
  setDateAfter,
  category,
  setCategory,
}: SearchProps) => {
  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  const dateHandler1 = (newDate: Dayjs | null) => {
    setDateBefore(newDate);
  };
  const dateHandler2 = (newDate: Dayjs | null) => {
    setDateAfter(newDate);
  };

  const categoryHandler = (e: any): void => {
    setCategory(e.target.value);
  };

  return (
    <Grid2
      container
      spacing={2}
    >
      <Grid2 size={8}>
        <Typography variant="h4">Filtrera kommande meetups</Typography>
      </Grid2>

      <Grid2 size={5}>
        <TextField
          value={inputText}
          onChange={inputHandler}
          type="search"
          fullWidth
          placeholder="Meetup eller plats"
          label="Sök"
        />
      </Grid2>
      <Grid2 size={5}>
        <TextField
          select
          fullWidth
          label="Kategori"
          value={category}
          onChange={categoryHandler}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {MeetupCategories.map((option) => (
            <MenuItem value={option}>{option}</MenuItem>
          ))}
        </TextField>
      </Grid2>
      <Grid2 size={5}>
        <DatePicker
          openTo="year"
          views={["year", "month", "day"]}
          label="Från datum"
          value={fromDate}
          onChange={dateHandler1}
          slotProps={{
            textField: { fullWidth: true },
            field: { clearable: true, onClear: () => dateHandler1(null) },
          }}
          maxDate={toDate || undefined}
        />
      </Grid2>
      <Grid2 size={5}>
        <DatePicker
          openTo="year"
          views={["year", "month", "day"]}
          label="Till datum"
          value={toDate}
          onChange={dateHandler2}
          slotProps={{
            textField: { fullWidth: true },
            field: { clearable: true, onClear: () => dateHandler2(null) },
          }}
          minDate={fromDate || undefined}
        />
      </Grid2>
    </Grid2>
  );
};

export default Searchbar;
