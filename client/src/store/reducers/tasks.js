import * as actionType from "../actions/actionTypes";
// import { updateObject } from "../../shared/utility";
const { v4: uuidv4 } = require('uuid');


const initialState = {
  columns : []
  //   columns : [
  //     {
  //     _id: uuidv4(),
  //     name: "Todo",
  //     tasks: [
  //       {_id: uuidv4(), content: "Go for a run"},
  //       {_id: uuidv4(), content: "Take the bins out"}
  //     ]
  //   },
  //   {
  //     _id: uuidv4(),
  //     name: "In Progress",
  //     tasks: [
  //         {_id: uuidv4(), content: "Cook meals for the week"},
  //         {_id: uuidv4(), content: "Complete next section of node course"}
  //     ]
  //   },
  //   {
  //     _id: uuidv4(),
  //     name: "Done",
  //     tasks: []
  //   }
  // ]
} 

const addTask = (state, action) => {
  const {task, id} = action;
  const { columns } = state;
  let columnIndex;
  for(let i = 0; i < columns.length; i++) {
    if(columns[i]._id === id) {
      columnIndex = i;
    }
  }
  const copiedColumns = [...columns];
  copiedColumns[columnIndex].tasks.push({_id: uuidv4(), content: task});
    return {
      ...state,
      columns: copiedColumns
    }
}

const taskMoved = (state, action) => {
  // const {source, destination} = action;
  // const { columns } = state;
  // let columnIndex;
  // for(let i = 0; i < columns.length; i++) {
  //   if(columns[i]._id === source.droppableId) {
  //     columnIndex = i;
  //   }
  // }
  // const copiedColumns = [...columns];
  // const [removed] = copiedColumns[columnIndex].tasks.splice(source.index, 1);
  // copiedColumns[columnIndex].tasks.splice(destination.index, 0, removed);
  // console.log(copiedColumns);
  return {
    ...state,
    columns: action.copiedColumns
  };
  
}

const taskMovedColumn = (state, action) => {
  const {source, destination} = action;
  const { columns } = state;
  let columnSourceIndex, columnDestIndex;
  for(let i = 0; i < columns.length; i++) {
    if(columns[i]._id === source.droppableId) {
      columnSourceIndex = i;
    } else if(columns[i]._id === destination.droppableId) {
      columnDestIndex = i;
    }
  }
  const copiedColumns = [...columns];
  const [removed] = copiedColumns[columnSourceIndex].tasks.splice(source.index, 1);
  copiedColumns[columnDestIndex].tasks.splice(destination.index, 0, removed);
  return {
    ...state,
    columns: copiedColumns
}
}

const columnMoved = (state, action) => {
  const {source, destination} = action;
  const { columns } = state;
  const copiedColumns = [...columns];
  const [removed] = copiedColumns.splice(source.index, 1);
  copiedColumns.splice(destination.index, 0, removed);
  return {
    ...state,
    columns: copiedColumns
  };
}

const addList = (state, action) => {
  const { columns } = state;
  const copiedColumns = [...columns];
  copiedColumns.push({_id: uuidv4(), name: action.newList, tasks: []})
    return {
      ...state,
      columns : copiedColumns
    };
  }

const editTask = (state, action) => {
  const { columns } = state;
  const { newTaskName, columnId, itemId, itemIndex } = action;
  const copiedColumns = [...columns];
  let columnIndex;
  for(let i = 0; i < columns.length; i++) {
    if(columns[i]._id === columnId) {
      columnIndex = i;
    }
  }
  copiedColumns[columnIndex].tasks.splice(itemIndex, 1);
  copiedColumns[columnIndex].tasks.splice(itemIndex, 0, {_id: itemId, content: newTaskName});
  return {
    ...state,
    columns: copiedColumns
}
}

const deleteTask = (state, action) => {
  const { columns } = state;
  const { columnId, itemIndex } = action;
  let columnIndex;
  for(let i = 0; i < columns.length; i++) {
    if(columns[i]._id === columnId) {
      columnIndex = i;
    }
  }
  const copiedColumns = [...columns];
  copiedColumns[columnIndex].tasks.splice(itemIndex, 1);
  return {
    ...state,
    columns : copiedColumns
}
}

const getTasks = (state, action) => {
  const {payload} = action;
  const copiedColumns = payload;
  console.log(payload)
  // Sort column order
  copiedColumns.sort((a, b) => {
    return a.columnOrder - b.columnOrder;
  });
  // Sort column.tasks order
  for(let i = 0; i< copiedColumns.length; i++) {
    copiedColumns[i].tasks.sort((a, b) => {
      return a.order - b.order;
    });
  }
  return {
    ...state,
    columns : copiedColumns
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
        case actionType.GET_TASKS: return getTasks(state, action);
        default:
            return state;
    }
};

export default reducer;
