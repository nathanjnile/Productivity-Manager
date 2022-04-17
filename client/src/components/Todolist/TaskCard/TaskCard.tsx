import React from "react";

import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import { EditDeleteModal } from "../Modals/EditDeleteModal";
import classes from "./TaskCard.module.css";
import { DraggableProvided, DraggableStateSnapshot } from "react-beautiful-dnd";

interface TaskCardProps {
  content: string;
  taskId: string;
  columnId: string;
  taskIndex: number;
  provided: DraggableProvided;
  snapshot: DraggableStateSnapshot;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  content,
  taskId,
  columnId,
  taskIndex,
  provided,
  snapshot,
}) => {
  return (
    <Card
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={provided.innerRef}
      className={classes.cardMain}
      style={{
        backgroundColor: snapshot.isDragging ? "#34546b" : "#3F51B5",
        ...provided.draggableProps.style,
      }}
    >
      <Typography
        variant="subtitle2"
        style={{ color: "white", overflow: "hidden" }}
      >
        {content}
      </Typography>
      <EditDeleteModal
        columnId={columnId}
        itemId={taskId}
        itemIndex={taskIndex}
      />
    </Card>
  );
};
