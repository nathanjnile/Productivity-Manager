import React, {useState} from "react";
import { connect } from "react-redux";

import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import classes from "../CssModules/Modal.module.css";

import * as actions from "../../store/actions/index";

const GoalModal = (props) => {
    const [open, setOpen] = useState(false);
    const [goalInput, setGoalInput] = useState("");
    const [dateInput, setDateInput] = useState("");

  
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const submitForm = (event) => {
        event.preventDefault();
        if (goalInput !== "" && dateInput !== "") {
        props.onGoalAdded(goalInput, dateInput, props.goals);
        }
        handleClose();
        setGoalInput("");
        setDateInput("");
    }
  
    const body = (
      <div className={classes.ModalBody}>
            <Typography variant="h5" gutterBottom style={{color: "#2c2f35"}}>
                Enter goal information:
            </Typography>
            <form onSubmit={(event) => submitForm(event)}>
            <TextField 
            id="Goal-field"
            label="Goal"
            size="small"
            value={goalInput}
            onChange={(event) => setGoalInput(event.target.value)}
            variant="filled" 
            style={{width: "100%", marginTop: 10}}
             />
            <TextField 
            id="date-field"
            label="Date"
            size="small"
            value={dateInput}
            onChange={(event) => setDateInput(event.target.value)}
            variant="filled" 
            style={{width: "100%", marginTop: 10}}
             />
             <Button type="submit" style={{backgroundColor: "#3F51B5", color:"#FFFFFF", marginTop: 10, textTransform: "none"}}>Add Goal</Button>
            </form>
      </div>
    );
  
    return (
      <div>
        <div style={{padding: 4, display:'flex',alignItems:'center',justifyContent:'center'}}>
        <Button onClick={handleOpen} style={{backgroundColor: "#3F51B5", color:"#FFFFFF", width: 100, textTransform: "none"}}>Add Goal</Button> 
        </div>
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

const mapStateToProps = state => {
  return {
    goals: state.goals.items,
  };
}

const mapDispatchToProps = dispatch => {
  return {
      onGoalAdded: (goal, date, goals) => dispatch(actions.addGoal(goal, date, goals)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GoalModal);