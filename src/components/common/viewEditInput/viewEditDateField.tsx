import { FormControl, styled, TextField } from "@mui/material";
import dayjs from "dayjs";

const StyledViewEditTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputLabel-root": {
    color: theme.palette.text.secondary,
    "& .Mui-disabled": {
      color: theme.palette.text.secondary,
    },
  },
  "& .MuiOutlinedInput-input.Mui-disabled": {
    WebkitTextFillColor: theme.palette.text.primary,
  },
  "& .MuiOutlinedInput-root.Mui-disabled": {
    border: "none",
    "& fieldset": {
      border: "none",
    },
  },
}));

interface ViewEditDateFieldProps {
  isEdit: boolean;
  handleChange: (value: string) => void;
  label: string;
  value?: string;
  isRequired?: boolean;
}

const ViewEditDateField = ({
  isEdit,
  handleChange,
  label,
  value,
  isRequired,
}: ViewEditDateFieldProps) => {
  const handleDateChange = (e: any) => {
    const value = e.target.value;
    const date = dayjs(value).format("YYYY-MM-DD");
    handleChange(date);
  };

  return (
    <FormControl fullWidth>
      <StyledViewEditTextField
        label={label}
        type="date"
        onChange={handleDateChange}
        value={value ? dayjs(value).format("YYYY-MM-DD") : ""}
        disabled={!isEdit}
        slotProps={{ inputLabel: { shrink: true } }}
        required={isRequired}
      />
    </FormControl>
  );
};

export default ViewEditDateField;
