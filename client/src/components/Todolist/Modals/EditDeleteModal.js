import React, {useState} from "react";
import { connect } from "react-redux";

import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import EditIcon from '@material-ui/icons/Edit';
import classes from "../../CssModules/Modal.module.css";
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import * as actions from "../../../store/actions/index";

const EditDeleteModal = (props) => {
    const {columnId, itemId, itemIndex, columns, onEditTask, onDeleteTask} = props;
    const [open, setOpen] = useState(false);
    const [taskInput, setTaskInput] = useState("");
  
    const handleOpen = () => {
      setOpen(true);
      setTaskInput(columns[columnId].tasks[itemIndex].content);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const submitForm = (event) => {
        event.preventDefault();
        if (taskInput !== "") {
          onEditTask(taskInput, columnId, itemId, itemIndex);
        }
        handleClose();
        setTaskInput("");
    }
  
    const body = (
      <div className={classes.ModalBody}>
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
             />
             <div style={{marginTop: 10, display: "flex", alignItems: "center", justifyContent:"center"}}>
             <Button type="submit" style={{backgroundColor: "#3F51B5", color:"#FFFFFF"}}>Edit Task</Button>
             <Button onClick={() => onDeleteTask(columnId, itemIndex, columns, itemId)}  style={{backgroundColor: "red", color:"#FFFFFF", marginLeft: "auto"}}>Delete Task</Button>
            </div>
            </form>
      </div>
    );
  
    return (
      <div>
        <EditIcon onClick={handleOpen} style={{color: "white", cursor: "pointer"}}/>
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
          style={{display:'flex',alignItems:'center',justifyContent:'center'}}
        >
        <Fade in={open}>
          {body}
        </Fade>
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
      onDeleteTask: (columnId, itemIndex, columns, itemId) => dispatch(actions.deleteTask(columnId, itemIndex, columns, itemId)),

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditDeleteModal);