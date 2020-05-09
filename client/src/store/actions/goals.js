import * as actionTypes from "./actionTypes";

export const addGoal = () => {
    return {
        type: actionTypes.ADD_GOAL
    }  
}

export const goalMoved = (source, destination) => {
    return {
        type: actionTypes.GOAL_MOVED,
        source: source,
        destination: destination
    }  
}

export const editGoal = () => {
    return {
        type: actionTypes.EDIT_GOAL
    }  
}

export const deleteGoal = () => {
    return {
        type: actionTypes.DELETE_GOAL
    }  
}