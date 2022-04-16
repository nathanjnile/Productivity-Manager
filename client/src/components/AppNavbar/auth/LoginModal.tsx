import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import classes from "../../CssModules/Modal.module.css";

import * as actions from "../../../store/actions/index";
import { RootState } from "../../..";

export const LoginModal: React.FunctionComponent = () => {
  const [open, setOpen] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [msg, setMsg] = useState(null);
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const error = useSelector((state: RootState) => state.error);

  useEffect(() => {
    if (open && isAuthenticated) {
      setOpen(false);
      clearFields();
    }
  }, [setOpen, open, isAuthenticated]);

  useEffect(() => {
    if (error.id === "LOGIN_FAIL") {
      setMsg(error.msg.msg);
      clearFields();
    }
  }, [error, msg]);

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    dispatch(actions.clearErrors());
    clearFields();
    setMsg(null);
  };

  const clearFields = () => {
    setEmailInput("");
    setPasswordInput("");
  };

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(
      actions.login({
        email: emailInput,
        password: passwordInput,
      })
    );
  };

  const body = (
    <div className={classes.ModalBody}>
      <Typography variant="h5" gutterBottom style={{ color: "#2c2f35" }}>
        Login!
      </Typography>
      <form
        onSubmit={(event: React.FormEvent<HTMLFormElement>) =>
          submitForm(event)
        }
      >
        <TextField
          id="Email-field"
          type="email"
          label="Email"
          size="small"
          value={emailInput}
          onChange={(event) => setEmailInput(event.target.value)}
          variant="filled"
          style={{ width: "100%" }}
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
          style={{ color: "#ff0000", marginTop: 10, textTransform: "none" }}
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
          Login
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
        Login
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
