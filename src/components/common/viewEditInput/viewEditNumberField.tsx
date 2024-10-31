import { FormControl, styled, TextField } from "@mui/material";

const StyledViewEditNumberField = styled(TextField)(({ theme }) => ({
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

interface ViewEditNumberFieldProps {
  isEdit: boolean;
  handleChange: (value: number) => void;
  label: string;
  value?: number;
  isRequired?: boolean;
}

const ViewEditNumberField = ({
  isEdit,
  handleChange,
  label,
  value,
  isRequired,
}: ViewEditNumberFieldProps) => {
  return (
    <FormControl fullWidth>
      <StyledViewEditNumberField
        label={label}
        type="number"
        onChange={(e: any) =>
          handleChange(e.target.value === "" ? null : e.target.value)
        }
        value={value === null ? "" : value}
        disabled={!isEdit}
        slotProps={{ inputLabel: { shrink: true } }}
        required={isRequired}
      />
    </FormControl>
  );
};

export default ViewEditNumberField;
