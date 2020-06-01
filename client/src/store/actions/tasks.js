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
    // Create deep copy for use later in comparison
    const columnsClone = lodash.cloneDeep(columns);
    const copiedColumns = [...columns];
    let columnIndex;
    for(let i = 0; i < columns.length; i++) {
      if(copiedColumns[i]._id === source.droppableId) {
        columnIndex = i;
      }
    }
    const [removed] = copiedColumns[columnIndex].tasks.splice(source.index, 1);
    copiedColumns[columnIndex].tasks.splice(destination.index, 0, removed);
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
        for(let i = 0; i < columnsClone.length; i++) {
            updatedArray.push(...columnsClone[i].tasks)
        }

        // const sourceItems = columnsClone[columnSourceIndex].tasks;
        // sourceItems.forEach(element => {
        //     element["type"] = "sameCol"
        // });
        // const destItems = columnsClone[columnDestIndex].tasks;
        // destItems.forEach(element => {
        //     element["type"] = "diffCol"
        // });
        // updatedArray.push(...sourceItems, ...destItems);

        console.log(updatedArray);
        
        // if(updatedArray.length > 0) {

        //     // axios call to send new task order to backend
        //     axios.post("/api/task/updateMoveColumn", {newTasks: updatedArray, sourceId: source.droppableId, destId: destination.droppableId})
        //     .then(res => {
        //         console.log(res);
        //     }).catch(error => {
        //         console.log(error);
        //     });
        // }
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
                    console.log(response.data);
                    dispatch({
                        type: actionTypes.GET_TASKS,
                        payload: response.data
                    })
                }).catch(err => console.log(err));
            };
}
