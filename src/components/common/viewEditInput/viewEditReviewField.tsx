import { styled } from "@mui/material/styles";
import Rating, { IconContainerProps } from "@mui/material/Rating";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";

const StyledRating = styled(Rating)(({ theme }) => ({
  "& .MuiRating-iconEmpty .MuiSvgIcon-root": {
    color: theme.palette.action.disabled,
  },
}));

const customIcons: {
  [index: string]: {
    icon: React.ReactElement<unknown>;
    label: string;
  };
} = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon color="error" />,
    label: "Väldigt missnöjd",
  },
  2: {
    icon: <SentimentDissatisfiedIcon color="error" />,
    label: "Missnöjd",
  },
  3: {
    icon: <SentimentSatisfiedIcon color="warning" />,
    label: "Lagom",
  },
  4: {
    icon: <SentimentSatisfiedAltIcon color="success" />,
    label: "Nöjd",
  },
  5: {
    icon: <SentimentVerySatisfiedIcon color="success" />,
    label: "Jävligt nöjd",
  },
};

const IconContainer = (props: IconContainerProps) => {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
};

interface ViewEditRatingFieldProps {
  isEdit: boolean;
  handleChange: (value: number) => void;
  value?: number;
  isRequired?: boolean;
}

const ViewEditRatingField = ({
  isEdit,
  handleChange,
  value,
}: ViewEditRatingFieldProps) => {
  return (
    <StyledRating
      name="highlight-selected-only"
      value={value}
      IconContainerComponent={IconContainer}
      getLabelText={(value: number) => customIcons[value].label}
      highlightSelectedOnly
      readOnly={!isEdit}
      onChange={(e: any) =>
        handleChange(e.target.value != undefined ? e.target.value : null)
      }
    />
  );
};

export default ViewEditRatingField;
