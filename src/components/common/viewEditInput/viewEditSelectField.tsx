/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormControl, MenuItem, styled, TextField } from "@mui/material";

export interface ViewEditSelectFieldOptionsModel {
  value: any;
  label: string;
}

const StyledViewEditSelectField = styled(TextField)(({ theme }) => ({
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
  "& .MuiSelect-icon.Mui-disabled": {
    opacity: 0,
  },
}));

interface ViewEditSelectFieldProps {
  isEdit: boolean;
  handleChange: (value: any) => void;
  label: string;
  value: any;
  options: ViewEditSelectFieldOptionsModel[];
  isRequired?: boolean;
}

const ViewEditSelectField = ({
  isEdit,
  handleChange,
  label,
  value,
  options,
  isRequired,
}: ViewEditSelectFieldProps) => {
  return (
    <FormControl fullWidth>
      <StyledViewEditSelectField
        label={label}
        select
        onChange={(e: any) =>
          handleChange(e.target.value === "" ? null : e.target.value)
        }
        value={value === null ? "" : value}
        disabled={!isEdit}
        slotProps={{ inputLabel: { shrink: true } }}
        required={isRequired}
      >
        {options.map((option) => (
          <MenuItem value={option.value}>{option.label}</MenuItem>
        ))}
      </StyledViewEditSelectField>
    </FormControl>
  );
};

export default ViewEditSelectField;
