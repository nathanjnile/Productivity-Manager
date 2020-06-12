import React from 'react';
import { Droppable, Draggable } from "react-beautiful-dnd";

import Typography from '@material-ui/core/Typography';
import classes from "./ListColumn.module.css"
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import TaskCard from "../TaskCard/TaskCard";
import ItemModal from "../Modals/ItemModal";


const ListColumn = (props) => {
    const {provided, column, _id} = props;

  return (
    <div className={classes.columnDiv} {...provided.draggableProps} ref={provided.innerRef}>
    <div className={classes.columnHeader} {...provided.dragHandleProps}>  
    <Typography variant="h6" className={classes.columnHeaderText}> {column.name} </Typography>
    <MoreHorizIcon fontSize="large" style={{cursor: "pointer"}}/>
    </div>
    <div style={{margin: 8}}>
    <Droppable droppableId={_id} key={_id} type="task">
      {(provided, snapshot) => {
        return (
          <div {...provided.droppableProps} ref={provided.innerRef} className={classes.columnMain}
           style={{background: snapshot.isDraggingOver ? "darkgrey" : "lightgrey"}}>
             {column.tasks.map((task, index) => {
               return (
                <Draggable key={task._id} draggableId={task._id} index={index}>
                  {(provided, snapshot) => {
                    return(
                      <TaskCard content={task.content} taskId={task._id} columnId={_id}
                                taskIndex={index} provided={provided} snapshot={snapshot}/>
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
    <ItemModal columnId={_id} />
    </div>
    </div>

  );
}


export default ListColumn;
