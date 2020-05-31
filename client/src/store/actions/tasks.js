import * as actionTypes from "./actionTypes";
import axios from "axios";
import changeOrder from "../../shared/reorder";
import lodash from "lodash";

export const addTask = (task, columnId) => {
    return {
        type: actionTypes.ADD_TASK,
        task: task,
        id: columnId
    }     
}

export const taskMoved = (source, destination, columns) => {
    // Do normal task movement
    // console.log(columns);
    // Create deep copy for use later
    const columnsClone = lodash.cloneDeep(columns);
    console.log(columnsClone);
    const copiedColumns = [...columns];
    let columnIndex;
    for(let i = 0; i < columns.length; i++) {
      if(copiedColumns[i]._id === source.droppableId) {
        columnIndex = i;
      }
    }
    const [removed] = copiedColumns[columnIndex].tasks.splice(source.index, 1);
    copiedColumns[columnIndex].tasks.splice(destination.index, 0, removed);
    console.log(columns)
    const copiedColumns2 = changeOrder({taskColumns: copiedColumns, columnIndex: columnIndex}, "taskOwnColumn");
    return dispatch => {
        dispatch({
        type: actionTypes.TASK_MOVED,
        copiedColumns: copiedColumns2,
        });
        // Compare old tasks and new tasks for updated items
        console.log(columnsClone);
        const updatedArray = [];   
        for(let i = 0; i < copiedColumns2[columnIndex].tasks.length;i++) {
            if (columnsClone[columnIndex].tasks[i]._id !== copiedColumns2[columnIndex].tasks[i]._id) {
                // console.log(items[i]);
                console.log(copiedColumns2[columnIndex].tasks[i]);
                updatedArray.push(copiedColumns2[columnIndex].tasks[i]);
            }
        }
        console.log(updatedArray);
        
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

export const taskMovedColumn = (source, destination) => {
    return {
        type: actionTypes.TASK_MOVED_COLUMN,
        source: source,
        destination: destination
    }
        
}

export const columnMoved = (source, destination) => {
    return {
        type: actionTypes.COLUMN_MOVED,
        source: source,
        destination: destination
    }
        
}

export const addList = (newList) => {
    return {
        type: actionTypes.ADD_LIST,
        newList: newList
    }
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

export const deleteTask = (columnId, itemIndex) => {
    return {
        type: actionTypes.DELETE_TASK,
        columnId: columnId,
        itemIndex: itemIndex
    }
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
