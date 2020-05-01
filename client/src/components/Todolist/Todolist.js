import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import uuid from "uuid/v4";
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

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
  const { source, destination } = result;

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

const Todolist = () => {
  const [columns, setColumns] = useState(columnsFromBackend);

  return (
    <div style={{display: "flex",justifyContent: "left", height: "100%"}}>
      <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)} >
        {Object.entries(columns).map(([id, column]) => {
          return(
            <div key={id} style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <Typography variant="h5" style={{userSelect: "none"}}> {column.name} </Typography>
            <div style={{margin: 8}}>
            <Droppable droppableId={id} key={id}>
              {(provided, snapshot) => {
                return (
                  <div
                   {...provided.droppableProps}
                   ref={provided.innerRef}
                   style={{
                     background: snapshot.isDraggingOver ? "lightblue" : "lightgrey",
                     padding: 4,
                     width: 200,
                     minHeight: 500
                   }} >
                     {column.items.map((item, index) => {
                       return (
                        <Draggable key={item.id} draggableId={item.id} index={index}>
                          {(provided, snapshot) => {
                            return(
                            <Card
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            style={{
                                userSelect: "none",
                                padding: 16,
                                margin: "0 0 8px 0",
                                minHeight: 30,
                                backgroundColor: snapshot.isDragging ? "#263B4A" : "#3F51B5",
                                color: "white",
                                ...provided.draggableProps.style
                              }} >
                              <Typography>
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
            </div>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
}

export default Todolist;
