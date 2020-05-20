import * as actionType from "../actions/actionTypes";
// import { updateObject } from "../../shared/utility";
import uuid from "uuid/v4";

const itemsFromBackend = [
    {id: uuid(), content: "Go for a run"},
    {id: uuid(), content: "Take the bins out"},
    {id: uuid(), content: "Cook meals for the week"},
    {id: uuid(), content: "Complete next section of node course"}
  ]
  
  const columns = 
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

const initialState = {
    columns
}

const addTask = (state, action) => {
  const {task, id} = action;
  const { columns } = state;
  const column = columns[id];
  const copiedItems = [...column.items];
  copiedItems.push({id: uuid(), content: task});
    return {
      ...state,
      columns : {
        ...columns,
        [id]: {
          ...column, 
          items: copiedItems
        }
      }
    };
}

const taskMoved = (state, action) => {
  const {source, destination} = action;
  const { columns } = state;
  const column = columns[source.droppableId];
  const copiedItems = [...column.items];
  const [removed] = copiedItems.splice(source.index, 1);
  copiedItems.splice(destination.index, 0, removed);
  return {
    ...state,
    columns : {
      ...columns,
     [source.droppableId]: {
      ...column,
      items: copiedItems
    }
  }
  };
  
}

const taskMovedColumn = (state, action) => {
  const {source, destination} = action;
  const { columns } = state;
  const sourceColumn = columns[source.droppableId];
  const destColumn = columns[destination.droppableId];
  const sourceItems = [...sourceColumn.items];
  const destItems = [...destColumn.items];
  const [removed] = sourceItems.splice(source.index, 1);
  destItems.splice(destination.index, 0, removed);
  return {
    ...state,
    columns : {
      ...columns,
      [source.droppableId] : {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId] : {
        ...destColumn,
        items: destItems
      }
  }
}
}

const columnMoved = (state, action) => {
  const {source, destination} = action;
  const { columns } = state;
  const newColumns = Object.entries({...columns});
  const [removed] = newColumns.splice(source.index, 1);
  newColumns.splice(destination.index, 0, removed);
  const convColumns = Object.fromEntries(newColumns);
  return {
    ...state,
    columns: {...convColumns}
  };
}

const addList = (state, action) => {
  const { columns } = state;
    return {
      ...state,
      columns : {
        ...columns,
        [uuid()]: {name: action.newList, items: []}
        }
      }
    };

const editTask = (state, action) => {
  const { columns } = state;
  const { newTaskName, columnId, itemId, itemIndex } = action;
  const sourceColumn = columns[columnId];
  const sourceItems = [...sourceColumn.items];
  sourceItems.splice(itemIndex, 1);
  sourceItems.splice(itemIndex, 0, {id: itemId, content: newTaskName});
  return {
    ...state,
    columns : {
      ...columns,
      [columnId] : {
        ...sourceColumn,
        items: sourceItems
      }
  }
}
}

const deleteTask = (state, action) => {
  const { columns } = state;
  const { columnId, itemIndex } = action;
  const sourceColumn = columns[columnId];
  const sourceItems = [...sourceColumn.items];
  sourceItems.splice(itemIndex, 1);
  console.log(sourceItems);
  return {
    ...state,
    columns : {
      ...columns,
      [columnId] : {
        ...sourceColumn,
        items: sourceItems
      }
  }
}
}

const reducer =(state = initialState, action) => {
    switch (action.type) {
        case actionType.ADD_TASK: return addTask(state, action);
        case actionType.TASK_MOVED: return taskMoved(state, action);
        case actionType.TASK_MOVED_COLUMN: return taskMovedColumn(state, action);
        case actionType.COLUMN_MOVED: return columnMoved(state, action);
        case actionType.ADD_LIST: return addList(state, action);
        case actionType.EDIT_TASK: return editTask(state, action);
        case actionType.DELETE_TASK: return deleteTask(state, action);
        default:
            return state;
    }
};

export default reducer;
