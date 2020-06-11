import React, {useState, useEffect} from 'react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { connect } from "react-redux";

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import classes from "./Todolist.module.css"
import TextField from '@material-ui/core/TextField';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckIcon from '@material-ui/icons/Check';
import ListColumn from "./ListColumn/ListColumn";

import * as actions from "../../store/actions/index";

const Todolist = (props) => {
  const {columns, onGetTasks, onAddList, onColumnMoved, onTaskMovedColumn, onTaskMoved} = props;
  const [enterAddList, setEnterAddList] = useState(true);
  const [listFieldInput, setListFieldInput] = useState("");

  useEffect(() => {
    onGetTasks();
}, [onGetTasks])

  const submitForm = (event) => {
    event.preventDefault();
    if(listFieldInput !== "") {
      const columnsLength = Object.entries({...columns}).length;
      onAddList(listFieldInput, columnsLength);
    }
    clearAddList();
  } 

  const clearAddList = () => {
    setEnterAddList(true);
    setListFieldInput("");
  }

  const listField = (
    <form onSubmit={(event) => submitForm(event)} style={{width: 200}}>
    <TextField 
    id="Task-field"
    label="Add List"
    size="small"
    value={listFieldInput}
    onChange={(event) => setListFieldInput(event.target.value)}
    variant="outlined" 
    style={{width: "100%", userSelect: "none"}}
    autoFocus
     />
     <div className={classes.addListIcons}>
     <CheckIcon type="submit" onClick={(event) => submitForm(event)} fontSize="large" className={classes.addListIconCheck} />
     <CancelIcon onClick={() => clearAddList()} fontSize="large" className={classes.addListIconCancel} />
     </div>
     </form>
  );

  const onDragEnd = (result) => {
    if(!result.destination) return;
    const { source, destination, type } = result;
    if(type === "column") {
      if(source.index !== destination.index) {
      onColumnMoved(source, destination, columns);
      } else return;
    } else {
      if(source.droppableId !== destination.droppableId) {
        onTaskMovedColumn(source, destination, columns);
      } else {
        if(source.index !== destination.index) {
        onTaskMoved(source, destination, columns);
      } else return;
      }
    }  
  }

  return (
    <React.Fragment>
    <Typography variant="h5" style={{userSelect: "none", display: "flex", alignItems: "left", justifyContent:"left", marginBottom: 10, marginLeft: 10}}>
    Task Tracker
    </Typography>
    <div className={classes.outerDragdropCon}>
      <DragDropContext onDragEnd={(result) => onDragEnd(result)} >
        <Droppable droppableId="all-column" direction="horizontal" type="column">
        {(provided) => (
          <div className={classes.columnDrop} {...provided.droppableProps} ref={provided.innerRef}>
          {Object.entries(columns).map(([_id, column], index) => {
            return(
              <Draggable key={_id} draggableId={_id} index={index}>
                {(provided) => (
                  <ListColumn provided={provided} column={column} _id={_id} />
                )}
              </Draggable>
            );
          })}
          {provided.placeholder}
          </div>
        )}
        </Droppable>
      </DragDropContext>
      <div style={{width: 200}}>
      {enterAddList ? <Button onClick={() => setEnterAddList(false)} className={classes.addListButton} style={{backgroundColor: "#3F51B5", color: "#ffffff", textTransform: "none"}}>Add List</Button> : listField}
      </div>
    </div>
    </React.Fragment>
  );
}

const mapStateToProps = state => {
  return {
      columns: state.tasks.columns
      };
}

const mapDispatchToProps = dispatch => {
  return {
      onGetTasks: () => dispatch(actions.getTasks()),
      onTaskMoved: (source, destination, columns) => dispatch(actions.taskMoved(source, destination, columns)),
      onTaskMovedColumn: (source, destination, columns) => dispatch(actions.taskMovedColumn(source, destination, columns)),
      onColumnMoved: (source, destination, columns) => dispatch(actions.columnMoved(source, destination, columns)),
      onAddList: (newList, columnsLength) => dispatch(actions.addList(newList, columnsLength)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Todolist);
