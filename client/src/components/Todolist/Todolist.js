import React from 'react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { connect } from "react-redux";

// import uuid from "uuid/v4";
import Card from '@material-ui/core/Card';
// import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import classes from "./Todolist.module.css"
import ItemModal from './ItemModal';

import * as actions from "../../store/actions/index";

const Todolist = (props) => {
  const columns = props.columns;

  const onDragEnd = (result) => {
    if(!result.destination) return;
    const { source, destination, type } = result;
    if(type === "column") {
      props.onColumnMoved(source, destination);
    } else {
      if(source.droppableId !== destination.droppableId) {
        props.onTaskMovedColumn(source, destination);
      } else {
        props.onTaskMoved(source, destination);
      }
    }

  
    
  }

  // const addTask = (id) => {
  //   console.log(id);
  //   console.log(columns[id]);
  //   const column = columns[id];
  //   const copiedItems = [...column.items];
  //   copiedItems.push({id: uuid(), content: "Added task"});
  //   setColumns({
  //     ...columns,
  //     [id]: {
  //       ...column, 
  //       items: copiedItems
  //     }
  //   });
  // }; 
  
  return (
    <div className={classes.outerDragdropCon}>
      <DragDropContext onDragEnd={(result) => onDragEnd(result)} >
        <Droppable droppableId="all-column" direction="horizontal" type="column">
        {(provided) => (
          <div className={classes.columnDrop} {...provided.droppableProps} ref={provided.innerRef}>
          {Object.entries(columns).map(([id, column], index) => {
            return(
              <Draggable key={id} draggableId={id} index={index}>
                {(provided) => (
                  <div className={classes.columnDiv} {...provided.draggableProps} ref={provided.innerRef}>
                  <Typography variant="h5" className={classes.columnHeader} {...provided.dragHandleProps}> {column.name} </Typography>
                  <div style={{margin: 8}}>
                  <Droppable droppableId={id} key={id} type="task">
                    {(provided, snapshot) => {
                      return (
                        <div {...provided.droppableProps} ref={provided.innerRef} className={classes.columnMain}
                         style={{background: snapshot.isDraggingOver ? "lightblue" : "lightgrey"}}>
                           {column.items.map((item, index) => {
                             return (
                              <Draggable key={item.id} draggableId={item.id} index={index}>
                                {(provided, snapshot) => {
                                  return(
                                  <Card {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}
                                  className={classes.cardMain}
                                  style={{backgroundColor: snapshot.isDragging ? "#263B4A" : "#3F51B5",
                                      ...provided.draggableProps.style}} >
                                    <Typography style={{color: "white"}}>
                                    {item.content} 
                                    </Typography>
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
                  <ItemModal columnId={id} />
                  {/* <Button onClick={() => addTask(id)}>add</Button> */}
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
      onTaskAdded: () => dispatch(actions.addTask()),
      onTaskMoved: (source, destination) => dispatch(actions.taskMoved(source, destination)),
      onTaskMovedColumn: (source, destination) => dispatch(actions.taskMovedColumn(source, destination)),
      onColumnMoved: (source, destination) => dispatch(actions.columnMoved(source, destination))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Todolist);
