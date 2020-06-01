import * as actionTypes from "./actionTypes";
import axios from "axios";
import changeOrder from "../../shared/reorder";
import lodash from "lodash";

export const addTask = (task, columnId, columns) => {
    console.log(task);
    console.log(columnId);
    let columnIndex;
    for(let i = 0; i < columns.length; i++) {
      if(columns[i]._id === columnId) {
        columnIndex = i;
      }
    }
    const columnLength = columns[columnIndex].tasks.length;
    return dispatch => {
        axios.post("/api/task/add", {content: task, order: columnLength, column : columnId})
        .then(response => {
            console.log(response)
            dispatch({
                type: actionTypes.ADD_TASK,
                payload: response.data,
                columnIndex: columnIndex
            })
        }).catch(err => console.log(err));
    };   
}

export const taskMoved = (source, destination, columns) => {
    // Create deep copy for use later in comparison
    const columnsClone = lodash.cloneDeep(columns);
    const copiedColumns = [...columns];
    // Find the column index which the task moved within
    let columnIndex;
    for(let i = 0; i < columns.length; i++) {
      if(copiedColumns[i]._id === source.droppableId) {
        columnIndex = i;
      }
    }
    // Removing task from column tasks array and reinserting at destination location
    const [removed] = copiedColumns[columnIndex].tasks.splice(source.index, 1);
    copiedColumns[columnIndex].tasks.splice(destination.index, 0, removed);
    //Updating order property of all the tasks in the specific column
    const copiedColumns2 = changeOrder({taskColumns: copiedColumns, columnIndex: columnIndex}, "taskOwnColumn");
    return dispatch => {
        dispatch({
        type: actionTypes.TASK_MOVED,
        copiedColumns: copiedColumns2,
        });
        // Compare old tasks and new tasks for updated items
        const updatedArray = [];   
        for(let i = 0; i < copiedColumns2[columnIndex].tasks.length;i++) {
            if (columnsClone[columnIndex].tasks[i]._id !== copiedColumns2[columnIndex].tasks[i]._id) {
                updatedArray.push(copiedColumns2[columnIndex].tasks[i]);
            }
        }
        
        if(updatedArray.length > 0) {

            // axios call to send new task order to backend
            axios.post("/api/task/updateMove", {newTasks: updatedArray})
            .then(res => {
                console.log(res);
            }).catch(error => {
                console.log(error);
            });
        }
    }  
    
}

export const taskMovedColumn = (source, destination, columns) => {
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
    removed.column = destination.droppableId;
    copiedColumns[columnDestIndex].tasks.splice(destination.index, 0, removed);
    // Reorder all columns or source and dest
    const copiedColumns2 = changeOrder({taskColumns: copiedColumns, columnSourceIndex: columnSourceIndex, columnDestIndex: columnDestIndex}, "taskDiffColumn");
    console.log(copiedColumns2);
    return dispatch => {
        dispatch({
            type: actionTypes.TASK_MOVED_COLUMN,
            copiedColumns: copiedColumns2
        });
        // Compare old tasks and new tasks for updated items
        const columnsClone = lodash.cloneDeep(copiedColumns2);
        const updatedArray = [];   
        // for(let i = 0; i < columnsClone.length; i++) {
        //     updatedArray.push(...columnsClone[i].tasks)
        // }

        const sourceItems = columnsClone[columnSourceIndex].tasks;
        const destItems = columnsClone[columnDestIndex].tasks;
        updatedArray.push(...sourceItems, ...destItems);

        console.log(updatedArray);
        
            // axios call to send new task order to backend
            axios.post("/api/task/updateMoveColumn", {newTasks: updatedArray})
            .then(res => {
                console.log(res);
            }).catch(error => {
                console.log(error);
            });
    }    
}

export const columnMoved = (source, destination, columns) => {
    const copiedColumns = [...columns];
    const [removed] = copiedColumns.splice(source.index, 1);
    copiedColumns.splice(destination.index, 0, removed);
    const copiedColumns2 = changeOrder({columns: copiedColumns}, "moveColumn");
    // Update column order
    return dispatch => {
        dispatch({
            type: actionTypes.COLUMN_MOVED,
                payload: copiedColumns2
        });
        console.log(copiedColumns2);
    
        const columnsClone = lodash.cloneDeep(copiedColumns2);
        columnsClone.forEach(col => {
            delete col.tasks;
        })
        console.log(columnsClone);
        // axios call to send new task order to backend
        axios.post("/api/column/moveColumn", {columnsUpdate: columnsClone})
        .then(res => {
            console.log(res);
        }).catch(error => {
            console.log(error);
        });
    } 
    
    
    
    // return {
    //     type: actionTypes.COLUMN_MOVED,
    //     source: source,
    //     destination: destination
    // }
        
}

export const addList = (newList, columnsLength) => {
    return dispatch => {
        axios.post("/api/column/add", {name: newList, columnOrder: columnsLength})
        .then(response => {
            console.log(response.data)
            dispatch({
                type: actionTypes.ADD_LIST,
                payload: response.data
            })
        }).catch(err => console.log(err));
    };  
}

export const editTask = (newTaskName, columnId, itemId, itemIndex) => {
    return {
        type: actionTypes.EDIT_TASK,
        newTaskName: newTaskName,
        columnId: columnId,
        itemId: itemId,
        itemIndex: itemIndex
    }
}

export const deleteTask = (columnId, itemIndex, columns, itemId) => {
    let columnIndex;
    for(let i = 0; i < columns.length; i++) {
      if(columns[i]._id === columnId) {
        columnIndex = i;
      }
    }
    const copiedColumns = [...columns];
    copiedColumns[columnIndex].tasks.splice(itemIndex, 1);
    const copiedColumns2 = changeOrder({taskColumns: copiedColumns, columnIndex: columnIndex}, "taskOwnColumn");
    const columnsClone = lodash.cloneDeep(copiedColumns2);
    console.log(columnsClone);
    const tasksToReorder = [...columnsClone[columnIndex].tasks];
    console.log(tasksToReorder);
    return dispatch => {
        axios.post("/api/task/deleteAndUpdate", {taskToDelete: itemId, tasksToReorder: tasksToReorder})
        .then(response => {
            console.log(response)
            dispatch({
                type: actionTypes.DELETE_TASK,
                payload: copiedColumns2
            })
        }).catch(err => console.log(err));
    };   
}

export const getTasks = () => {
    return dispatch => {
                // dispatch(setItemsLoading);
                axios.get("/api/column/tasks")
                .then(response => {
                    // console.log(response.data);
                    dispatch({
                        type: actionTypes.GET_TASKS,
                        payload: response.data
                    })
                }).catch(err => console.log(err));
            };
}
