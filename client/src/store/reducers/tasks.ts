import { AnyAction } from "redux";
import * as actionType from "../actions/actionTypes";
import { Column, TasksState } from "../types";

const initialState: TasksState = {
  columns: {},
  isLoading: false,
};

const taskLoading = (state: TasksState) => {
  return {
    ...state,
    isLoading: true,
  };
};

const addTask = (state: TasksState, action: AnyAction) => {
  const { content, order, column, _id, owner } = action.payload;
  const { columns } = state;
  // Take shallow clone of specific tasks array and push on to it
  const copiedTasks = [...columns[column].tasks];
  copiedTasks.push({ _id, content, order, column, owner });
  return {
    ...state,
    isLoading: false,
    columns: {
      ...columns,
      [column]: {
        ...columns[column],
        tasks: copiedTasks,
      },
    },
  };
};

const taskMoved = (state: TasksState, action: AnyAction) => {
  const { copiedTasks, source, column } = action;
  return {
    ...state,
    columns: {
      ...state.columns,
      [source.droppableId]: {
        ...column,
        tasks: copiedTasks,
      },
    },
  };
};

const taskMovedColumn = (state: TasksState, action: AnyAction) => {
  const {
    sourceTasks,
    destTasks,
    sourceColumn,
    destColumn,
    source,
    destination,
  } = action;
  const { columns } = state;
  return {
    ...state,
    columns: {
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        tasks: sourceTasks,
      },
      [destination.droppableId]: {
        ...destColumn,
        tasks: destTasks,
      },
    },
  };
};

const columnMoved = (state: TasksState, action: AnyAction) => {
  return {
    ...state,
    columns: action.payload,
  };
};

const addList = (state: TasksState, action: AnyAction) => {
  const { _id, name, columnOrder, owner, __v } = action.payload;
  const { columns } = state;
  return {
    ...state,
    isLoading: false,
    columns: {
      ...columns,
      [_id]: { name, columnOrder, owner, __v, tasks: [] },
    },
  };
};

const editList = (state: TasksState, action: AnyAction) => {
  const { newListName, columnId } = action;
  const { columns } = state;

  return {
    ...state,
    isLoading: false,
    columns: {
      ...columns,
      [columnId]: {
        ...columns[columnId],
        name: newListName,
      },
    },
  };
};

const deleteList = (state: TasksState, action: AnyAction) => {
  const { convColumns } = action;
  return {
    ...state,
    isLoading: false,
    columns: convColumns,
  };
};

const editTask = (state: TasksState, action: AnyAction) => {
  const { columns } = state;
  const { newTaskName, columnId, itemIndex } = action;
  const sourceColumn = columns[columnId];
  const sourceTasks = [...sourceColumn.tasks];
  const [removed] = sourceTasks.splice(itemIndex, 1);
  sourceTasks.splice(itemIndex, 0, { ...removed, content: newTaskName });
  return {
    ...state,
    isLoading: false,
    columns: {
      ...columns,
      [columnId]: {
        ...sourceColumn,
        tasks: sourceTasks,
      },
    },
  };
};

const deleteTask = (state: TasksState, action: AnyAction) => {
  const { columns } = state;
  const { columnId, sourceColumn, sourceTasks } = action;
  return {
    ...state,
    isLoading: false,
    columns: {
      ...columns,
      [columnId]: {
        ...sourceColumn,
        tasks: sourceTasks,
      },
    },
  };
};

const getTasks = (state: TasksState, action: AnyAction) => {
  const { payload } = action;
  const columnsData = [...payload[1]];
  const taskData = [...payload[0]];

  const columns: { [key: string]: Column } = {};

  columnsData.forEach((value) => {
    columns[value._id] = {
      _id: value._id,
      name: value.name,
      columnOrder: value.columnOrder,
      owner: value.owner,
      tasks: [],
    };
  });

  const columns2 = Object.entries({ ...columns });

  // Sort the columns

  columns2.sort((a, b) => {
    return a[1].columnOrder - b[1].columnOrder;
  });

  const columnsSorted = Object.fromEntries([...columns2]);

  // Enter tasks
  taskData.forEach((value) => {
    if (columnsSorted[value.column]) {
      columnsSorted[value.column].tasks.push(value);
    }
  });

  // Sort tasks
  const clonedColumns = Object.entries({ ...columnsSorted });

  clonedColumns.forEach((value, index) => {
    value[1].tasks.sort((a, b) => {
      return a.order - b.order;
    });
  });

  const finalColumns = Object.fromEntries(clonedColumns);

  return {
    ...state,
    isLoading: false,
    columns: finalColumns,
  };
};

const clearTasks = (state: TasksState) => {
  return {
    ...state,
    isLoading: false,
    columns: {},
  };
};

const reducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case actionType.ADD_TASK:
      return addTask(state, action);
    case actionType.TASK_MOVED:
      return taskMoved(state, action);
    case actionType.TASK_MOVED_COLUMN:
      return taskMovedColumn(state, action);
    case actionType.COLUMN_MOVED:
      return columnMoved(state, action);
    case actionType.ADD_LIST:
      return addList(state, action);
    case actionType.EDIT_LIST:
      return editList(state, action);
    case actionType.DELETE_LIST:
      return deleteList(state, action);
    case actionType.EDIT_TASK:
      return editTask(state, action);
    case actionType.DELETE_TASK:
      return deleteTask(state, action);
    case actionType.GET_TASKS:
      return getTasks(state, action);
    case actionType.CLEAR_TASKS:
      return clearTasks(state);
    case actionType.TASK_LOADING:
      return taskLoading(state);
    default:
      return state;
  }
};

export default reducer;
