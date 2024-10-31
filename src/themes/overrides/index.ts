// material-ui
import { Theme } from "@mui/material/styles";
// third-party
import { merge } from "lodash";
import Button from "./Button";
import ButtonBase from "./ButtonBase";
import CardContent from "./CardContent";
import Dialog from "./Dialog";
import DialogContentText from "./DialogContentText";
import IconButton from "./IconButton";
import InputLabel from "./InputLabel";
import Tab from "./Tab";
import Tabs from "./Tabs";
import Typography from "./Typography";
import DialogTitle from "./DialogTitle";

export default function ComponentsOverrides(theme: Theme) {
  return merge(
    Button(theme),
    ButtonBase(),
    CardContent(),
    Dialog(),
    DialogContentText(theme),
    DialogTitle(),
    IconButton(theme),
    InputLabel(theme),
    Tab(theme),
    Tabs(),
    Typography()
  );
}
