import React, {useState} from "react";
import { connect } from "react-redux";

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import * as actions from "../../store/actions/index";

  function getModalStyle() {
    const top = 25;
    // const left = 50;
  
    return {
      top: `${top}%`,
      margin: "auto"
      // left: `${left}%`,
      // transform: `translate(-${top}%, -${left}%)`,
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

const GoalModal = (props) => {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);
    const [goalInput, setGoalInput] = useState("");
    const [dateInput, setDateInput] = useState("");

  
    const handleOpen = () => {
      setOpen(true);
      console.log(props.columnId);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const submitForm = (event) => {
        event.preventDefault();
        if (goalInput !== "" && dateInput !== "") {
        props.onGoalAdded(goalInput, dateInput);
        }
        handleClose();
        setGoalInput("");
        setDateInput("");
    }
  
    const body = (
      <div style={modalStyle} className={classes.paper}>
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
             <br/><br/>
             <Button type="submit" style={{backgroundColor: "#3F51B5", color:"#FFFFFF"}}>Add Task</Button>
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
      columns: state.tasks.columns,
  };
}

const mapDispatchToProps = dispatch => {
  return {
      onGoalAdded: (goal, date) => dispatch(actions.addGoal(goal, date)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GoalModal);