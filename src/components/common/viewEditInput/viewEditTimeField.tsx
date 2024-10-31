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

interface ViewEditTimeFieldProps {
  isEdit: boolean;
  handleChange: (value: string) => void;
  label: string;
  value?: string;
  isRequired?: boolean;
}

const ViewEditTimeField = ({
  isEdit,
  handleChange,
  label,
  value,
  isRequired,
}: ViewEditTimeFieldProps) => {
  const handleTimeChange = (e: any) => {
    const value = e.target.value;
    handleChange(value as string);
  };

  return (
    <FormControl fullWidth>
      <StyledViewEditTextField
        label={label}
        type="time"
        onChange={handleTimeChange}
        value={value ? value : ""}
        disabled={!isEdit}
        slotProps={{ inputLabel: { shrink: true } }}
        required={isRequired}
      />
    </FormControl>
  );
};

export default ViewEditTimeField;
