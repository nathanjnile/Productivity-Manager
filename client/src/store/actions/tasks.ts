import * as actionTypes from "./actionTypes";
import axios from "axios";
import changeOrder from "../../shared/reorder";
import { tokenConfig } from "./auth";
import { AppThunk } from "../types";

export const addTask: AppThunk = (task, columnId, columns) => {
  const columnLength = columns[columnId].tasks.length;
  return (dispatch, getState) => {
    dispatch({ type: actionTypes.TASK_LOADING });
    axios
      .post(
        "/api/task/add",
        { content: task, order: columnLength, column: columnId },
        tokenConfig(getState)
      )
      .then((response) => {
        // console.log(response)
        dispatch({
          type: actionTypes.ADD_TASK,
          payload: response.data.task,
        });
      })
      .catch((err) => {
        // console.log(err)
      });
  };
};

export const taskMoved: AppThunk = (source, destination, columns) => {
  // Create deep copy for use later in comparison
  const column = columns[source.droppableId];
  const copiedTasks = [...column.tasks];
  const [removed] = copiedTasks.splice(source.index, 1);
  copiedTasks.splice(destination.index, 0, removed);
  //Updating order property of all the tasks in the specific column
  changeOrder([...copiedTasks], "tasks");
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.TASK_MOVED,
      copiedTasks,
      source,
      column,
    });

    // axios call to send new task order to backend
    axios
      .post(
        "/api/task/updateMove",
        { newTasks: copiedTasks },
        tokenConfig(getState)
      )
      .then((res) => {
        // console.log(res);
      })
      .catch((error) => {
        // console.log(error);
      });
  };
};

export const taskMovedColumn: AppThunk = (source, destination, columns) => {
  const sourceColumn = columns[source.droppableId];
  const destColumn = columns[destination.droppableId];
  const sourceTasks = [...sourceColumn.tasks];
  const destTasks = [...destColumn.tasks];
  const [removed] = sourceTasks.splice(source.index, 1);
  destTasks.splice(destination.index, 0, removed);
  destTasks[destination.index].column = destination.droppableId;
  // Reorder all source and dest tasks
  changeOrder([...sourceTasks], "tasks");
  changeOrder([...destTasks], "tasks");
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.TASK_MOVED_COLUMN,
      sourceTasks,
      destTasks,
      sourceColumn,
      destColumn,
      source,
      destination,
    });
    const updatedArray = [];
    updatedArray.push(...sourceTasks, ...destTasks);

    // axios call to send new task order to backend
    axios
      .post(
        "/api/task/updateMoveColumn",
        { newTasks: updatedArray },
        tokenConfig(getState)
      )
      .then((res) => {
        // console.log(res);
      })
      .catch((error) => {
        // console.log(error);
      });
  };
};

export const columnMoved: AppThunk = (source, destination, columns) => {
  const newColumns = Object.entries({ ...columns });
  const [removed] = newColumns.splice(source.index, 1);
  newColumns.splice(destination.index, 0, removed);
  const copiedColumns = changeOrder({ columns: newColumns }, "moveColumn");
  const convColumns = Object.fromEntries(copiedColumns);
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.COLUMN_MOVED,
      payload: convColumns,
    });

    const columnsClone = [...copiedColumns];
    const updatedColumns = columnsClone.map((value, index) => {
      return {
        _id: value[0],
        columnOrder: value[1].columnOrder,
      };
    });

    // axios call to send new task order to backend
    axios
      .post(
        "/api/column/moveColumn",
        { columnsUpdate: updatedColumns },
        tokenConfig(getState)
      )
      .then((res) => {
        // console.log(res);
      })
      .catch((error) => {
        // console.log(error);
      });
  };
};

export const addList: AppThunk = (newList, columnsLength) => {
  return (dispatch, getState) => {
    dispatch({ type: actionTypes.TASK_LOADING });
    axios
      .post(
        "/api/column/add",
        {
          name: newList,
          columnOrder: columnsLength,
          owner: getState().auth.user._id,
        },
        tokenConfig(getState)
      )
      .then((response) => {
        // console.log(response.data)
        dispatch({
          type: actionTypes.ADD_LIST,
          payload: response.data,
        });
      })
      .catch((err) => {
        // console.log(err)
      });
  };
};

export const editList: AppThunk = (newListName, columnId) => {
  return (dispatch, getState) => {
    dispatch({ type: actionTypes.TASK_LOADING });
    axios
      .post(
        `/api/column/update/${columnId}`,
        { name: newListName },
        tokenConfig(getState)
      )
      .then((response) => {
        // console.log(response.data)
        dispatch({
          type: actionTypes.EDIT_LIST,
          newListName,
          columnId,
        });
      })
      .catch((err) => {
        // console.log(err)
      });
  };
};

export const deleteList: AppThunk = (columnId, columnIndex, columns) => {
  const newColumns = Object.entries({ ...columns });
  newColumns.splice(columnIndex, 1);
  const copiedColumns = changeOrder({ columns: newColumns }, "moveColumn");
  const convColumns = Object.fromEntries([...copiedColumns]);
  return (dispatch, getState) => {
    dispatch({ type: actionTypes.TASK_LOADING });
    axios
      .post(
        "/api/column/deleteAndUpdate",
        { columnToDelete: columnId, columnsToReorder: copiedColumns },
        tokenConfig(getState)
      )
      .then((response) => {
        // console.log(response.data)
        dispatch({
          type: actionTypes.DELETE_LIST,
          convColumns: convColumns,
        });
      })
      .catch((err) => {
        // console.log(err)
      });
  };
};

export const editTask: AppThunk = (
  newTaskName,
  columnId,
  itemId,
  itemIndex
) => {
  return (dispatch, getState) => {
    dispatch({ type: actionTypes.TASK_LOADING });
    axios
      .post(
        `/api/task/update/${itemId}`,
        { content: newTaskName },
        tokenConfig(getState)
      )
      .then((response) => {
        // console.log(response)
        dispatch({
          type: actionTypes.EDIT_TASK,
          newTaskName: newTaskName,
          columnId: columnId,
          itemIndex: itemIndex,
        });
      })
      .catch((err) => {
        // console.log(err)
      });
  };
};

export const deleteTask: AppThunk = (columnId, itemIndex, columns, itemId) => {
  const sourceColumn = columns[columnId];
  const sourceTasks = [...sourceColumn.tasks];
  sourceTasks.splice(itemIndex, 1);
  changeOrder(sourceTasks, "tasks");
  return (dispatch, getState) => {
    dispatch({ type: actionTypes.TASK_LOADING });
    axios
      .post(
        "/api/task/deleteAndUpdate",
        { taskToDelete: itemId, tasksToReorder: sourceTasks },
        tokenConfig(getState)
      )
      .then((response) => {
        // console.log(response)
        dispatch({
          type: actionTypes.DELETE_TASK,
          columnId,
          sourceTasks,
          sourceColumn,
        });
      })
      .catch((err) => {
        // console.log(err)
      });
  };
};

export const getTasks: AppThunk = () => {
  return (dispatch, getState) => {
    dispatch({ type: actionTypes.TASK_LOADING });
    axios
      .get("/api/column/tasks", tokenConfig(getState))
      .then((response) => {
        dispatch({
          type: actionTypes.GET_TASKS,
          payload: response.data,
        });
      })
      .catch((err) => {
        // console.log(err)
      });
  };
};
