import React, {useState, useEffect} from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import * as actions from "../../../store/actions/index";
  
  function getModalStyle() {
    const top = 25;

    return {
      top: `${top}%`,
      margin: "auto"
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 300,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),

    },
  }));

const RegisterModal = (props) => {
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);
    const [nameInput, setNameInput] = useState("");
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [msg, setMsg] = useState(null);

  useEffect(() => {
    if(props.error.id === "REGISTER_FAIL") {
    setMsg(props.error.msg.msg);
    };

    if(open) {
      if(props.isAuthenticated) {
        setOpen(false);
        clearFields();
      }
    }
  }, [props.error, msg, setOpen, open, props.isAuthenticated]);

    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
      props.onClearErrors();
      clearFields();
      setMsg(null);
    };

    const clearFields = () => {
      setNameInput("");
      setEmailInput("");
      setPasswordInput("");
    }

    const submitForm = (event) => {
        event.preventDefault();

        const newUser = {
          name: nameInput,
          email: emailInput,
          password: passwordInput
        }

        props.onRegister(newUser);
    }
  
    const body = (
      <div style={modalStyle} className={classes.paper}>
            <Typography variant="h5" gutterBottom style={{color: "#2c2f35"}}>
                Register!
            </Typography>
            <form onSubmit={(event) => submitForm(event)}>
            <TextField 
            id="Name-field"
            label="Name"
            size="small"
            value={nameInput}
            onChange={(event) => setNameInput(event.target.value)}
            variant="filled" 
            style={{width: "100%", marginBottom: "10px"}}
             />
            <TextField 
            id="Email-field"
            type="email"
            label="Email"
            size="small"
            value={emailInput}
            onChange={(event) => setEmailInput(event.target.value)}
            variant="filled" 
            style={{width: "100%", marginBottom: "10px"}}
             />
            <TextField 
            id="Password-field"
            type="password"
            label="Password"
            size="small"
            value={passwordInput}
            onChange={(event) => setPasswordInput(event.target.value)}
            variant="filled" 
            style={{width: "100%", marginBottom: "10px"}}
             />
            <Typography variant="h6" gutterBottom style={{color: "#ff0000", marginBottom: "10px"}}>
                {msg}
            </Typography>
             <Button type="submit" style={{backgroundColor: "#3F51B5", color:"#FFFFFF", width: "100%"}}>Register</Button>
            </form>
      </div>
    );
  
    return (
      <div>
        <Button onClick={handleOpen} style={{backgroundColor: "#3F51B5", color:"#FFFFFF"}}>Register</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          style={{display:'flex',alignItems:'center',justifyContent:'center'}}
        >
          {body}
        </Modal>
      </div>
      );
}

RegisterModal.propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    onRegister: PropTypes.func.isRequired,
    onClearErrors: PropTypes.func.isRequired
}

const mapStateToProps = state => {
    return {
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onRegister:  (newUser) => dispatch(actions.register(newUser)),
        onClearErrors: () => dispatch(actions.clearErrors())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterModal);