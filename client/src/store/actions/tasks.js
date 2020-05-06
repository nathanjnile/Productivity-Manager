import * as actionTypes from "./actionTypes";

export const addTask = (task, columnId) => {
    return {
        type: actionTypes.ADD_TASK,
        task: task,
        id: columnId
    }
        
}

export const taskMoved = (source, destination) => {
    return {
        type: actionTypes.TASK_MOVED,
        source: source,
        destination: destination
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