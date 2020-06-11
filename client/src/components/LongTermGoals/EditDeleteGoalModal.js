import React, {useState} from "react";
import { connect } from "react-redux";

import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import EditIcon from '@material-ui/icons/Edit';
import classes from "../CssModules/Modal.module.css";

import * as actions from "../../store/actions/index";

const EditDeleteGoalModal = (props) => {
    const {cardId, cardIndex, goals, onEditGoal, onDeleteGoal} = props;
    const [open, setOpen] = useState(false);
    const [goalInput, setGoalInput] = useState("");
    const [dateInput, setDateInput] = useState("");
  
    const handleOpen = () => {
      setOpen(true);
      setGoalInput(goals[cardIndex].content);
      setDateInput(goals[cardIndex].date);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const submitForm = (event) => {
        event.preventDefault();
        if (goalInput !== "") {
          onEditGoal(cardId, goalInput, dateInput, cardIndex);
        }
        handleClose();
        setGoalInput("");
    }
  
    const body = (
      <div className={classes.ModalBody}>
            <Typography variant="h5" gutterBottom style={{color: "#2c2f35"}}>
                Edit task name:
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
            id="Date-field"
            label="Date"
            size="small"
            value={dateInput}
            onChange={(event) => setDateInput(event.target.value)}
            variant="filled" 
            style={{width: "100%", marginTop: 10}}
             />
             <div style={{marginTop: 10, display: "flex", alignItems: "center", justifyContent:"center"}}>
             <Button type="submit" style={{backgroundColor: "#3F51B5", color:"#FFFFFF"}}>Change Goal</Button>
             <Button onClick={() => onDeleteGoal(cardId, cardIndex, goals)}  style={{backgroundColor: "red", color:"#FFFFFF", marginLeft: "auto", opacity: 0.8}}>Delete Task</Button>
            </div>
            </form>
      </div>
    );
  
    return (
      <div>
        <EditIcon onClick={handleOpen} style={{color: "white", cursor: "pointer", fontSize: "medium"}}/>
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
        onEditGoal: (cardId, newGoalContent, newGoalDate, cardIndex) => dispatch(actions.editGoal(cardId, newGoalContent, newGoalDate, cardIndex)),
        onDeleteGoal: (cardId, cardIndex, goals) => dispatch(actions.deleteGoal(cardId, cardIndex, goals))
         
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditDeleteGoalModal);