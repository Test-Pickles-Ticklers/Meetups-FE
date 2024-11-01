import { Dispatch, SetStateAction } from "react";
import MeetupModel from "../../../api/models/MeetupModel";
import {
  Card,
  CardContent,
  Divider,
  Grid2,
  IconButton,
  Stack,
} from "@mui/material";
import { useUserContext } from "../../../context/UserContext";
import EditIcon from "@mui/icons-material/Edit";
import ViewEditDateField from "../../common/viewEditInput/viewEditDateField";
import ViewEditTimeField from "../../common/viewEditInput/viewEditTimeField";
import SaveIcon from "@mui/icons-material/Save";
import ClearIcon from "@mui/icons-material/Clear";
import ViewEditTextField from "../../common/viewEditInput/viewEditTextField";
import ViewEditNumberField from "../../common/viewEditInput/viewEditNumberField";
import ViewEditSelectField from "../../common/viewEditInput/viewEditSelectField";
import MeetupCategories from "../../../api/models/MeetupCategories";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

interface DetailedMeetupCardProps {
  meetup: MeetupModel;
  editMeetup?: EditMeetupModel;
  setEditMeetup: Dispatch<SetStateAction<EditMeetupModel | undefined>>;
  isEdit: boolean;
  handleEditClick: () => void;
  handleCancelClick: () => void;
  handleDeleteClick: () => void;
}

export interface EditMeetupModel {
  isNew: boolean;
  meetup?: MeetupModel;
}

const DetailedMeetupCard = ({
  meetup,
  isEdit,
  editMeetup,
  setEditMeetup,
  handleEditClick,
  handleCancelClick,
  handleDeleteClick,
}: DetailedMeetupCardProps) => {
  const { user } = useUserContext();
  return (
    <Card>
      <CardContent>
        <Grid2
          container
          spacing={1}
          rowGap={2}
        >
          <Grid2 size={10}>
            <ViewEditTextField
              isEdit={isEdit}
              handleChange={(value: string) =>
                setEditMeetup((prev) => ({
                  ...prev!,
                  meetup: { ...prev!.meetup!, title: value },
                }))
              }
              label={"Titel"}
              value={editMeetup ? editMeetup.meetup!.title : meetup.title}
            />
          </Grid2>
          <Grid2
            size={2}
            justifyContent={"flex-end"}
            container
          >
            {!editMeetup?.isNew ? (
              user!.email == meetup.organizer ? (
                !isEdit ? (
                  <Grid2>
                    <IconButton onClick={handleEditClick}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={handleDeleteClick}>
                      <DeleteForeverIcon />
                    </IconButton>
                  </Grid2>
                ) : (
                  <Stack direction="row">
                    <IconButton onClick={handleEditClick}>
                      <SaveIcon />
                    </IconButton>
                    <IconButton onClick={handleCancelClick}>
                      <ClearIcon />
                    </IconButton>
                  </Stack>
                )
              ) : null
            ) : null}
          </Grid2>
          <Grid2
            size={12}
            mt={-1.5}
          >
            <Divider />
          </Grid2>
          <Grid2 size={6}>
            <ViewEditDateField
              value={editMeetup ? editMeetup.meetup!.date : meetup.date}
              isEdit={isEdit}
              handleChange={(value: string) =>
                setEditMeetup((prev) => ({
                  ...prev!,
                  meetup: { ...prev?.meetup!, date: value },
                }))
              }
              label={"Datum"}
            />
          </Grid2>
          <Grid2 size={6}>
            <ViewEditTimeField
              value={editMeetup ? editMeetup.meetup!.time : meetup.time}
              isEdit={isEdit}
              handleChange={(value: string) =>
                setEditMeetup((prev) => ({
                  ...prev!,
                  meetup: { ...prev?.meetup!, time: value },
                }))
              }
              label={"Tid"}
            />
          </Grid2>
          <Grid2 size={6}>
            <ViewEditTextField
              isEdit={isEdit}
              handleChange={(value: string) =>
                setEditMeetup((prev) => ({
                  ...prev!,
                  meetup: { ...prev!.meetup!, location: value },
                }))
              }
              label={"Plats"}
              value={editMeetup ? editMeetup.meetup!.location : meetup.location}
            />
          </Grid2>
          <Grid2 size={6}>
            <ViewEditSelectField
              isEdit={isEdit}
              handleChange={(value: string) =>
                setEditMeetup((prev) => ({
                  ...prev!,
                  meetup: { ...prev!.meetup!, category: value },
                }))
              }
              label={"Kategori"}
              value={editMeetup ? editMeetup.meetup!.category : meetup.category}
              options={MeetupCategories.map((option) => ({
                value: option,
                label: option,
              }))}
            />
          </Grid2>
          <Grid2 size={6}>
            <ViewEditNumberField
              isEdit={false}
              handleChange={(value: number) => console.log(value)}
              label={"Antal deltagare"}
              value={meetup.participants.length}
            />
          </Grid2>
          <Grid2 size={6}>
            <ViewEditNumberField
              isEdit={isEdit}
              handleChange={(value: number) =>
                setEditMeetup((prev) => ({
                  ...prev!,
                  meetup: {
                    ...prev!.meetup!,
                    maxParticipants:
                      value >= meetup.participants.length
                        ? value
                        : prev!.meetup!.maxParticipants,
                  },
                }))
              }
              label={"Max deltagare"}
              value={
                editMeetup
                  ? editMeetup.meetup!.maxParticipants
                  : meetup.maxParticipants
              }
            />
          </Grid2>
          <Grid2 size={12}>
            <ViewEditTextField
              isEdit={isEdit}
              handleChange={(value: string) =>
                setEditMeetup((prev) => ({
                  ...prev!,
                  meetup: { ...prev!.meetup!, description: value },
                }))
              }
              label={"Beskrivning"}
              value={
                editMeetup ? editMeetup.meetup!.description : meetup.description
              }
            />
          </Grid2>
        </Grid2>
      </CardContent>
    </Card>
  );
};

export default DetailedMeetupCard;
