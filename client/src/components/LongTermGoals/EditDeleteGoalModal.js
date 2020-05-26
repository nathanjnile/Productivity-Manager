import React, {useState} from "react";
import { connect } from "react-redux";

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import EditIcon from '@material-ui/icons/Edit';


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

const EditDeleteGoalModal = (props) => {
    const {cardId, cardIndex, goals} = props;
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);
    const [goalInput, setGoalInput] = useState("");
    const [dateInput, setDateInput] = useState("");
  
    const handleOpen = () => {
      setOpen(true);
      console.log(goals);
      for (let i = 0;i < goals.length;i++) {
        console.log(i, goals[i].order);
      }
      // console.log(cardId);
      setGoalInput(props.goals[cardIndex].content);
      setDateInput(props.goals[cardIndex].date);

      // setTaskInput(props.columns[columnId].items[itemIndex].content);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const submitForm = (event) => {
        event.preventDefault();
        if (goalInput !== "") {
          // props.onEditTask(taskInput, columnId, itemId, itemIndex);
        // props.onTaskAdded(taskInput, props.columnId);
        }
        handleClose();
        // setTaskInput("");
    }
  
    const body = (
      <div style={modalStyle} className={classes.paper}>
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
             <Button type="submit" style={{backgroundColor: "#3F51B5", color:"#FFFFFF"}}>Change Task</Button>
             <Button onClick={() => props.onDeleteGoal(cardId, cardIndex)}  style={{backgroundColor: "red", color:"#FFFFFF", marginLeft: "auto"}}>Delete Task</Button>
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
        onEditGoal: (source, destination) => dispatch(actions.editGoal(source, destination)),
        onDeleteGoal: (cardId, cardIndex) => dispatch(actions.deleteGoal(cardId, cardIndex))
         
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditDeleteGoalModal);