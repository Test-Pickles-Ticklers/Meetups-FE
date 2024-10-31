import { alpha } from "@mui/material";
import { useTheme } from "styled-components";

const theme = useTheme();

const commonShadow = {
  "&::after": {
    boxShadow: `0 0 5px 5px ${alpha(theme.palette.primary.main, 0.9)}`,
  },
  "&:active::after": {
    boxShadow: `0 0 0 0 ${alpha(theme.palette.primary.main, 0.9)}`,
  },
  "&:focus-visible": {
    outline: `2px solid ${theme.palette.primary.dark}`,
    outlineOffset: 2,
  },
};

const buttonOverrides = {
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
  ...commonShadow,
};

export default buttonOverrides;
