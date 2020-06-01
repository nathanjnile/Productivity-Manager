import React, {useState, useEffect} from 'react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { connect } from "react-redux";

import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import classes from "./Todolist.module.css"
import ItemModal from './Modals/ItemModal';
import TextField from '@material-ui/core/TextField';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckIcon from '@material-ui/icons/Check';
import EditDeleteModal from "./Modals/EditDeleteModal";

import * as actions from "../../store/actions/index";

const Todolist = (props) => {
  const [enterAddList, setEnterAddList] = useState(true);
  const [listFieldInput, setListFieldInput] = useState("");
  const {columns, onGetTasks} = props;

  useEffect(() => {
    onGetTasks();
    // console.log(items);
}, [onGetTasks])

  const submitForm = (event) => {
    event.preventDefault();
    if(listFieldInput !== "") {
      props.onAddList(listFieldInput);
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
      props.onColumnMoved(source, destination, columns);
    } else {
      if(source.droppableId !== destination.droppableId) {
        props.onTaskMovedColumn(source, destination, columns);
      } else {
        props.onTaskMoved(source, destination, columns);
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
          {columns.map((column, index) => {
            return(
              <Draggable key={column._id} draggableId={column._id} index={index}>
                {(provided) => (
                  <div className={classes.columnDiv} {...provided.draggableProps} ref={provided.innerRef}>
                  <Typography variant="h6" className={classes.columnHeader} {...provided.dragHandleProps}> {column.name} </Typography>
                  <div style={{margin: 8}}>
                  <Droppable droppableId={column._id} key={column._id} type="task">
                    {(provided, snapshot) => {
                      return (
                        <div {...provided.droppableProps} ref={provided.innerRef} className={classes.columnMain}
                         style={{background: snapshot.isDraggingOver ? "lightblue" : "lightgrey"}}>
                           {column.tasks.map((item, index) => {
                             return (
                              <Draggable key={item._id} draggableId={item._id} index={index}>
                                {(provided, snapshot) => {
                                  return(
                                  <Card {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}
                                  className={classes.cardMain}
                                  style={{backgroundColor: snapshot.isDragging ? "#263B4A" : "#3F51B5",
                                      ...provided.draggableProps.style}}
                                      >
                                    <Typography variant="subtitle2" style={{color: "white"}}>
                                    {item.content} 
                                    </Typography>
                                    <EditDeleteModal columnId={column._id} itemId={item._id} itemIndex={index}/>
                                  </Card>
                                  );
                                }}
                              </Draggable>
                             );
                           })}
                           {provided.placeholder}
                        </div>
                      );
                    }}
                  </Droppable>
                  <ItemModal columnId={column._id} />
                  </div>
                  </div>
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
      columns: state.tasks.columns,
  };
}

const mapDispatchToProps = dispatch => {
  return {
      onGetTasks: () => dispatch(actions.getTasks()),
      onTaskAdded: () => dispatch(actions.addTask()),
      onTaskMoved: (source, destination, columns) => dispatch(actions.taskMoved(source, destination, columns)),
      onTaskMovedColumn: (source, destination, columns) => dispatch(actions.taskMovedColumn(source, destination, columns)),
      onColumnMoved: (source, destination, columns) => dispatch(actions.columnMoved(source, destination, columns)),
      onAddList: (newList) => dispatch(actions.addList(newList))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Todolist);
