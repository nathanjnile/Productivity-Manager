import React from "react";
import { Droppable, Draggable, DraggableProvided } from "react-beautiful-dnd";

import Typography from "@material-ui/core/Typography";
import classes from "./ListColumn.module.css";
import { TaskCard } from "../TaskCard/TaskCard";
import { ItemModal } from "../Modals/ItemModal";
import { EditDeleteListModal } from "../Modals/EditDeleteListModal";
import { Column, Task } from "../../../store/types";

interface ListColumnProps {
  provided: DraggableProvided;
  column: Column;
  _id: string;
  columnIndex: number;
}

export const ListColumn: React.FC<ListColumnProps> = ({
  provided,
  column,
  _id,
  columnIndex,
}) => {
  return (
    <div
      className={classes.columnDiv}
      {...provided.draggableProps}
      ref={provided.innerRef}
    >
      <div className={classes.columnHeader} {...provided.dragHandleProps}>
        <Typography variant="h6" className={classes.columnHeaderText}>
          {" "}
          {column.name}{" "}
        </Typography>
        <EditDeleteListModal columnId={_id} columnIndex={columnIndex} />
      </div>
      <div style={{ margin: 8 }}>
        <Droppable droppableId={_id} key={_id} type="task">
          {(provided, snapshot) => {
            return (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={classes.columnMain}
                style={{
                  background: snapshot.isDraggingOver
                    ? "darkgrey"
                    : "lightgrey",
                }}
              >
                {column.tasks.map((task: Task, index: number) => {
                  return (
                    <Draggable
                      key={task._id}
                      draggableId={task._id}
                      index={index}
                    >
                      {(provided, snapshot) => {
                        return (
                          <TaskCard
                            content={task.content}
                            taskId={task._id}
                            columnId={_id}
                            taskIndex={index}
                            provided={provided}
                            snapshot={snapshot}
                          />
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
};
