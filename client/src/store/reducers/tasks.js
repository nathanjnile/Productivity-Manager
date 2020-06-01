import * as actionType from "../actions/actionTypes";
// import { updateObject } from "../../shared/utility";


const initialState = {
  columns : []
} 

const addTask = (state, action) => {
  const {content, order, column, _id} = action.payload;
  const {columnIndex} = action;
  const { columns } = state;
  const copiedColumns = [...columns];
  copiedColumns[columnIndex].tasks.push({_id, content, order, column});
    return {
      ...state,
      columns: copiedColumns
    }
}

const taskMoved = (state, action) => {
  return {
    ...state,
    columns: action.copiedColumns
  };
  
}

const taskMovedColumn = (state, action) => {
  // const {source, destination} = action;
  // const { columns } = state;
  // let columnSourceIndex, columnDestIndex;
  // for(let i = 0; i < columns.length; i++) {
  //   if(columns[i]._id === source.droppableId) {
  //     columnSourceIndex = i;
  //   } else if(columns[i]._id === destination.droppableId) {
  //     columnDestIndex = i;
  //   }
  // }
  // const copiedColumns = [...columns];
  // const [removed] = copiedColumns[columnSourceIndex].tasks.splice(source.index, 1);
  // copiedColumns[columnDestIndex].tasks.splice(destination.index, 0, removed);
  return {
    ...state,
    columns: action.copiedColumns
}
}

const columnMoved = (state, action) => {
  // const {source, destination} = action;
  // const { columns } = state;
  // const copiedColumns = [...columns];
  // const [removed] = copiedColumns.splice(source.index, 1);
  // copiedColumns.splice(destination.index, 0, removed);
  return {
    ...state,
    columns: action.payload
  };
}

const addList = (state, action) => {
  const {payload} = action;
  const { columns } = state;
  const copiedColumns = [...columns];
  copiedColumns.push({_id: payload._id, name: payload.name, columnOrder: payload.columnOrder, tasks: []})
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
  // const { columns } = state;
  // const { columnId, itemIndex } = action;
  // let columnIndex;
  // for(let i = 0; i < columns.length; i++) {
  //   if(columns[i]._id === columnId) {
  //     columnIndex = i;
  //   }
  // }
  // const copiedColumns = [...columns];
  // copiedColumns[columnIndex].tasks.splice(itemIndex, 1);
  return {
    ...state,
    columns : action.payload
}
}

const getTasks = (state, action) => {
  const {payload} = action;
  const data = [...payload];
  console.log(data);
  const columns = [...data[1]];

  columns.forEach(col => {
    col["tasks"] = []
  })

  // console.log(columns);

  data[0].forEach(task => {
    for(let i = 0; i < columns.length; i++) {
      if (task.column === columns[i]._id) {
        columns[i].tasks.push(task);
      }
    }
  })

  // Sort column order
  columns.sort((a, b) => {
    return a.columnOrder - b.columnOrder;
  });

  // // Sort column.tasks order
  for(let i = 0; i< columns.length; i++) {
    columns[i].tasks.sort((a, b) => {
      return a.order - b.order;
    });
  }
  return {
    ...state,
    columns : columns
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
