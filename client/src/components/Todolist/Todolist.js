import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import uuid from "uuid/v4";
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import classes from "./Todolist.module.css"
import ItemModal from './ItemModal';

const itemsFromBackend = [
  {id: uuid(), content: "First task"},
  {id: uuid(), content: "Second task"},
  {id: uuid(), content: "Third task"},
  {id: uuid(), content: "Fourth task"},
  {id: uuid(), content: "Fifth task"},
  {id: uuid(), content: "Sixth task"},
  {id: uuid(), content: "Seventh task"}
]

const columnsFromBackend = 
  {
    [uuid()]: {
      name: "Todo",
      items: itemsFromBackend
    },
    [uuid()]: {
      name: "In Progress",
      items: []
    },
    [uuid()]: {
      name: "Done",
      items: []
    }
  };

const onDragEnd = (result, columns, setColumns) => {
  if(!result.destination) return;
  const { source, destination, type } = result;
  if(type === "column") {
      const newColumns = Object.entries({...columns});
      const [removed] = newColumns.splice(source.index, 1);
      newColumns.splice(destination.index, 0, removed);
      const convColumns = Object.fromEntries(newColumns);
      setColumns(convColumns);
    
  } else {
  if(source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns, 
      [source.droppableId] : {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId] : {
        ...destColumn,
        items: destItems
      }
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column, 
        items: copiedItems
      }
    })
  }
}
}  

const Todolist = () => {
  const [columns, setColumns] = useState(columnsFromBackend);

  const addTask = (id) => {
    console.log(id);
    console.log(columns[id]);
    const column = columns[id];
    const copiedItems = [...column.items];
    copiedItems.push({id: uuid(), content: "Added task"});
    setColumns({
      ...columns,
      [id]: {
        ...column, 
        items: copiedItems
      }
    });
  }; 
  
  return (
    <div className={classes.outerDragdropCon}>
      <DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)} >
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
                  <ItemModal />
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

export default Todolist;
