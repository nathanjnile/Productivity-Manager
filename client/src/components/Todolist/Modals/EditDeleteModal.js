import React, {useState} from "react";
import { connect } from "react-redux";

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import EditIcon from '@material-ui/icons/Edit';


import * as actions from "../../../store/actions/index";

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

const EditDeleteModal = (props) => {
    const {columnId, itemId, itemIndex} = props;
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);
    const [taskInput, setTaskInput] = useState("");
  
    const handleOpen = () => {
      setOpen(true);
      console.log(props.columns[columnId].items[itemIndex]);
      setTaskInput(props.columns[columnId].items[itemIndex].content);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const submitForm = (event) => {
        event.preventDefault();
        if (taskInput !== "") {
          props.onEditTask(taskInput, columnId, itemId, itemIndex);
        // props.onTaskAdded(taskInput, props.columnId);
        }
        handleClose();
        setTaskInput("");
    }
  
    const body = (
      <div style={modalStyle} className={classes.paper}>
            <Typography variant="h5" gutterBottom style={{color: "#2c2f35"}}>
                Edit task name:
            </Typography>
            <form onSubmit={(event) => submitForm(event)}>
            <TextField 
            id="Task-field"
            label="Task"
            size="small"
            value={taskInput}
            onChange={(event) => setTaskInput(event.target.value)}
            variant="filled" 
            style={{width: "100%"}}
            // autoFocus
             />
             <br/><br/>
             <div >
             <Button type="submit" style={{backgroundColor: "#3F51B5", color:"#FFFFFF"}}>Change Task</Button>
             </div>
            <Button style={{backgroundColor: "#3F51B5", color:"#FFFFFF", alignItems: "end"}}>Delete Task</Button>
            </form>
      </div>
    );
  
    return (
      <div>
        <EditIcon onClick={handleOpen} style={{alignItems: "right", color: "white", cursor: "pointer"}}/>
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
      onEditTask: (newTaskName, columnId, itemId, itemIndex) => dispatch(actions.editTask(newTaskName, columnId, itemId, itemIndex)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditDeleteModal);