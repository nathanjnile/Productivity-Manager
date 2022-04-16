import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
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

export const GoalModal: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [goalInput, setGoalInput] = useState("");
  const [dateInput, setDateInput] = useState<Date>(new Date());

  const dispatch = useDispatch();
  const goals = useSelector((state: RootState) => state.goals.goals);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDateChange = (date: MaterialUiPickersDate) => {
    if (date) setDateInput(date);
  };

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (goalInput !== "") {
      dispatch(actions.addGoal(goalInput, dateInput.toDateString(), goals));
    }
    handleClose();
    setGoalInput("");
  };

  const body = (
    <div className={classes.ModalBody}>
      <Typography
        id="simple-modal-title"
        variant="h5"
        gutterBottom
        style={{ color: "#2c2f35" }}
      >
        Enter goal information:
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
          autoFocus
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
        <Button
          type="submit"
          style={{
            backgroundColor: "#3F51B5",
            color: "#FFFFFF",
            marginTop: 10,
            textTransform: "none",
          }}
        >
          Add Goal
        </Button>
      </form>
    </div>
  );

  return (
    <div>
      <div
        style={{
          padding: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          onClick={handleOpen}
          style={{
            backgroundColor: "#3F51B5",
            color: "#FFFFFF",
            width: 100,
            textTransform: "none",
          }}
        >
          Add Goal
        </Button>
      </div>
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
