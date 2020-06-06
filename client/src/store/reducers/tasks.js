import * as actionType from "../actions/actionTypes";
// import { updateObject } from "../../shared/utility";


const initialState = {
  columns : {}
} 

const addTask = (state, action) => {
  const {content, order, column, _id} = action.payload;
  const { columns } = state;
  // Take shallow clone of specific tasks array and push on to it
  const copiedTasks = [...columns[column].tasks];
  copiedTasks.push({_id, content, order, column});
    return {
      ...state,
      columns: {
        ...columns,
        [column] : {
          ...columns[column],
          tasks: copiedTasks
        }
      }
    }
}

const taskMoved = (state, action) => {
  const {copiedTasks, source, column} = action;
  return {
    ...state,
    columns: {
      ...state.columns,
      [source.droppableId] : {
        ...column,
        tasks : copiedTasks
      }
    }
  };
  
}

const taskMovedColumn = (state, action) => {
  const { sourceTasks, destTasks, sourceColumn, destColumn, source, destination } = action;
  const { columns } = state;
  return {
    ...state,
    columns : {
      ...columns,
      [source.droppableId] : {
        ...sourceColumn,
        tasks: sourceTasks
      },
      [destination.droppableId] : {
        ...destColumn,
        tasks: destTasks
      }
  }
}
}

const columnMoved = (state, action) => {
  return {
    ...state,
    columns: action.payload
  };
}

const addList = (state, action) => {
  const { payload } = action;
  const { columns } = state;
    return {
      ...state,
      columns : {
        ...columns,
        [payload._id] : {name: payload.name, columnOrder: payload.columnOrder, tasks: []}
      }
    };
  }

const editTask = (state, action) => {
  const { columns } = state;
  const { newTaskName, columnId, itemIndex } = action;
  const sourceColumn = columns[columnId];
  const sourceTasks = [...sourceColumn.tasks];
  const [removed] = sourceTasks.splice(itemIndex, 1);
  sourceTasks.splice(itemIndex, 0, {...removed, content: newTaskName});
  return {
    ...state,
    columns : {
      ...columns,
      [columnId] : {
        ...sourceColumn,
        tasks: sourceTasks
      }
  }
}
}

const deleteTask = (state, action) => {
  const { columns } = state;
  const { columnId, sourceColumn, sourceTasks } = action;
  return {
    ...state,
    columns : {
      ...columns,
      [columnId] : {
        ...sourceColumn,
        tasks: sourceTasks
      }
  }
}
}

const getTasks = (state, action) => {
  const {payload} = action;
  const columnsData = [...payload[1]];
  const taskData = [...payload[0]];
  
  const columns = {};

  columnsData.forEach(value => {
    columns[value._id] = {
      name : value.name,
      columnOrder: value.columnOrder,
      tasks :[]
    }
  })

  const columns2 = Object.entries({...columns});
  
  // Sort the columns

  columns2.sort((a, b) => {
    return a[1].columnOrder - b[1].columnOrder;
    });

  const columnsSorted = Object.fromEntries([...columns2]);

  // Enter tasks
  taskData.forEach(value => {
    columnsSorted[value.column].tasks.push(value);
  })

  // Sort tasks
  const clonedColumns = Object.entries({...columnsSorted});

  clonedColumns.forEach((value, index) => {
    value[1].tasks.sort((a, b) => {
        return a.order - b.order;
        });
  })

  const finalColumns = Object.fromEntries(clonedColumns);

  return {
    ...state,
    columns : finalColumns
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
