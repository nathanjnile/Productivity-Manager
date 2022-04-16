import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import EditIcon from "@material-ui/icons/Edit";
import classes from "../CssModules/Modal.module.css";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import * as actions from "../../store/actions/index";
import { RootState } from "../..";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";

interface EditDeleteGoalModalProps {
  cardId: string;
  cardIndex: string;
}

export const EditDeleteGoalModal: React.FC<EditDeleteGoalModalProps> = ({
  cardId,
  cardIndex,
}) => {
  const [open, setOpen] = useState(false);
  const [goalInput, setGoalInput] = useState("");
  const [dateInput, setDateInput] = useState("");
  const dispatch = useDispatch();

  const goals = useSelector((state: RootState) => state.goals.goals);

  const handleOpen = () => {
    setOpen(true);
    setGoalInput(goals[cardIndex].content);
    setDateInput(goals[cardIndex].date);
  };

  const handleClose = () => setOpen(false);

  const handleDateChange = (date: MaterialUiPickersDate) => {
    if (date) setDateInput(date.toDateString());
  };

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (goalInput !== "") {
      dispatch(actions.editGoal(cardId, goalInput, dateInput, cardIndex));
    }
    handleClose();
    setGoalInput("");
  };

  const body = (
    <div className={classes.ModalBody}>
      <Typography variant="h5" gutterBottom style={{ color: "#2c2f35" }}>
        Edit task name:
      </Typography>
      <form
        onSubmit={(event: React.FormEvent<HTMLFormElement>) =>
          submitForm(event)
        }
      >
        <TextField
          id="Goal-field"
          label="Goal"
          size="small"
          value={goalInput}
          onChange={(event) => setGoalInput(event.target.value)}
          variant="filled"
          style={{ width: "100%", marginTop: 10 }}
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="Date"
            format="dd/MM/yyyy"
            value={dateInput}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
            style={{ width: "100%", marginTop: 10, backgroundColor: "#E3E3E3" }}
          />
        </MuiPickersUtilsProvider>
        <div
          style={{
            marginTop: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            type="submit"
            style={{ backgroundColor: "#3F51B5", color: "#FFFFFF" }}
          >
            Edit Goal
          </Button>
          <Button
            onClick={() =>
              dispatch(actions.deleteGoal(cardId, cardIndex, goals))
            }
            style={{
              backgroundColor: "red",
              color: "#FFFFFF",
              marginLeft: "auto",
              opacity: 0.8,
            }}
          >
            Delete Goal
          </Button>
        </div>
      </form>
    </div>
  );

  return (
    <div>
      <EditIcon
        onClick={handleOpen}
        style={{ color: "white", cursor: "pointer", fontSize: "medium" }}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Fade in={open}>{body}</Fade>
      </Modal>
    </div>
  );
};
