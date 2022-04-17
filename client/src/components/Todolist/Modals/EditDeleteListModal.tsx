import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import classes from "../../CssModules/Modal.module.css";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import * as actions from "../../../store/actions/index";
import { RootState } from "../../..";

interface EditDeleteListModalProps {
  columnId: string;
  columnIndex: number;
}

export const EditDeleteListModal: React.FC<EditDeleteListModalProps> = ({
  columnId,
  columnIndex,
}) => {
  const [open, setOpen] = useState(false);
  const [listInput, setListInput] = useState("");
  const dispatch = useDispatch();
  const columns = useSelector((state: RootState) => state.tasks.columns);

  const handleOpen = () => {
    setOpen(true);
    setListInput(columns[columnId].name);
  };

  const handleClose = () => setOpen(false);

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (listInput !== "") {
      dispatch(actions.editList(listInput, columnId));
    }
    handleClose();
    setListInput("");
  };

  const body = (
    <div className={classes.ModalBody}>
      <Typography variant="h5" gutterBottom style={{ color: "#2c2f35" }}>
        Edit list name:
      </Typography>
      <form onSubmit={(event) => submitForm(event)}>
        <TextField
          id="Task-field"
          label="Task"
          size="small"
          value={listInput}
          onChange={(event) => setListInput(event.target.value)}
          variant="filled"
          style={{ width: "100%" }}
        />
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
            Edit List
          </Button>
          <Button
            onClick={() =>
              dispatch(actions.deleteList(columnId, columnIndex, columns))
            }
            style={{
              backgroundColor: "red",
              color: "#FFFFFF",
              marginLeft: "auto",
              opacity: 0.8,
            }}
          >
            Delete List
          </Button>
        </div>
      </form>
    </div>
  );

  return (
    <div>
      <MoreHorizIcon
        onClick={handleOpen}
        fontSize="large"
        style={{ cursor: "pointer" }}
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
