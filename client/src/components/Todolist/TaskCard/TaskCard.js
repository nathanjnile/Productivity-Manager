import React from 'react';

import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import EditDeleteModal from "../Modals/EditDeleteModal";
import classes from "./TaskCard.module.css"


const TaskCard = (props) => {
    const {content, taskId, columnId, taskIndex, provided, snapshot} = props;

  return (
    <Card {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}
    className={classes.cardMain}
    style={{backgroundColor: snapshot.isDragging ? "#34546b" : "#3F51B5",
        ...provided.draggableProps.style}}
        >
      <Typography variant="subtitle2" style={{color: "white"}}>
      {content} 
      </Typography>
      <EditDeleteModal columnId={columnId} itemId={taskId} itemIndex={taskIndex}/>
    </Card>
  );
}


export default TaskCard;
