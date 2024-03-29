import React, {useState} from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import classes from "../../CssModules/Modal.module.css";
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import * as actions from "../../../store/actions/index";

const ItemModal = (props) => {
    const {onTaskAdded, columnId, columns} = props;
    const [open, setOpen] = useState(false);
    const [taskInput, setTaskInput] = useState("");
  
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const submitForm = (event) => {
        event.preventDefault();
        if (taskInput !== "") {
        onTaskAdded(taskInput, columnId, columns);
        }
        handleClose();
        setTaskInput("");
    }
  
    const body = (
      <div className={classes.ModalBody}>
            <Typography variant="h5" gutterBottom style={{color: "#2c2f35"}}>
                Enter task name:
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
            autoFocus
             />
             <Button type="submit" style={{backgroundColor: "#3F51B5", color:"#FFFFFF", marginTop: 10, textTransform: "none"}}>Add Task</Button>
            </form>
      </div>
    );
  
    return (
      <div>
        <div style={{padding: 4, display:'flex',alignItems:'center',justifyContent:'center'}}>
        <Button onClick={handleOpen} style={{backgroundColor: "#3F51B5", color:"#FFFFFF", width: 100, textTransform: "none"}}>Add Task</Button> 
        </div>
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

ItemModal.propTypes = {
  onTaskAdded: PropTypes.func.isRequired,
  columnId: PropTypes.string.isRequired,
  columns: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
      columns: state.tasks.columns,
  };
}

const mapDispatchToProps = dispatch => {
  return {
      onTaskAdded: (task, columnId, columns) => dispatch(actions.addTask(task, columnId, columns)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemModal);