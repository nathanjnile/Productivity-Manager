import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import classes from "../../CssModules/Modal.module.css";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import * as actions from "../../../store/actions/index";
import { RootState } from "../../..";

export const RegisterModal: React.FunctionComponent = () => {
  const [open, setOpen] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [msg, setMsg] = useState("");
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const error = useSelector((state: RootState) => state.error);

  useEffect(() => {
    if (error.id === "REGISTER_FAIL") {
      setMsg(error.msg.msg);
    }
  }, [error]);

  useEffect(() => {
    if (open && isAuthenticated) {
      setOpen(false);
      clearFields();
    }
  }, [setOpen, open, isAuthenticated]);

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    dispatch(actions.clearErrors());
    clearFields();
    setMsg("");
  };

  const clearFields = () => {
    setNameInput("");
    setEmailInput("");
    setPasswordInput("");
  };

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (nameInput === "" || emailInput === "" || passwordInput === "")
      return setMsg("please enter all fields");
    if (passwordInput.length < 7) return setMsg("password minimum length is 7");

    dispatch(
      actions.register({
        name: nameInput,
        email: emailInput,
        password: passwordInput,
      })
    );
  };

  const body = (
    <div className={classes.ModalBody}>
      <Typography variant="h5" gutterBottom style={{ color: "#2c2f35" }}>
        Register!
      </Typography>
      <form
        onSubmit={(event: React.FormEvent<HTMLFormElement>) =>
          submitForm(event)
        }
      >
        <TextField
          id="Name-field"
          label="Name"
          size="small"
          value={nameInput}
          onChange={(event) => setNameInput(event.target.value)}
          variant="filled"
          style={{ width: "100%", marginTop: 10 }}
        />
        <TextField
          id="Email-field"
          type="email"
          label="Email"
          size="small"
          value={emailInput}
          onChange={(event) => setEmailInput(event.target.value)}
          variant="filled"
          style={{ width: "100%", marginTop: 10 }}
        />
        <TextField
          id="Password-field"
          type="password"
          label="Password"
          size="small"
          value={passwordInput}
          onChange={(event) => setPasswordInput(event.target.value)}
          variant="filled"
          style={{ width: "100%", marginTop: 10 }}
        />
        <Typography
          variant="h6"
          gutterBottom
          style={{ color: "#ff0000", marginTop: 10 }}
        >
          {msg}
        </Typography>
        <Button
          type="submit"
          style={{
            backgroundColor: "#3F51B5",
            color: "#FFFFFF",
            marginTop: 10,
            textTransform: "none",
          }}
        >
          Register
        </Button>
      </form>
    </div>
  );

  return (
    <div>
      <Button
        onClick={handleOpen}
        style={{ backgroundColor: "#3F51B5", color: "#FFFFFF" }}
      >
        Register
      </Button>
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
