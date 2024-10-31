import { FormControl, styled, TextField } from "@mui/material";

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

interface ViewEditTextFieldProps {
  isEdit: boolean;
  handleChange: (value: string) => void;
  label: string;
  value: string;
  isRequired?: boolean;
}

const ViewEditTextField = ({
  isEdit,
  handleChange,
  label,
  value,
  isRequired,
}: ViewEditTextFieldProps) => {
  return (
    <FormControl fullWidth>
      <StyledViewEditTextField
        label={label}
        onChange={(e: any) => handleChange(e.target.value)}
        value={value}
        disabled={!isEdit}
        slotProps={{ inputLabel: { shrink: true } }}
        required={isRequired}
      />
    </FormControl>
  );
};

export default ViewEditTextField;
