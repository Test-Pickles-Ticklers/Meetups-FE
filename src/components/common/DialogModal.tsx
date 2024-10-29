import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid2,
  Slide,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return (
    <Slide
      direction="up"
      ref={ref}
      {...props}
    />
  );
});
interface DialogModalProps {
  isOpen: boolean;
  children: React.ReactNode;
  title: string;
  handleSubmit: () => void;
  handleCancel: () => void;
}

const DialogModal: React.FC<DialogModalProps> = ({
  isOpen,
  children,
  title,
  handleCancel,
  handleSubmit,
}) => {
  return (
    <Dialog
      open={isOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleCancel}
      sx={{ padding: 2 }}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Grid2
          columnSpacing={4}
          padding={2}
          width={"100%"}
          alignItems={"flex-end"}
        >
          <Button onClick={handleCancel}>Avbryt</Button>
          <Button
            onClick={handleSubmit}
            variant={"contained"}
          >
            Bekräfta
          </Button>
        </Grid2>
      </DialogActions>
    </Dialog>
  );
};

export default DialogModal;