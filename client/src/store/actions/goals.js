import * as actionTypes from "./actionTypes";
import axios from "axios";

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

export const getGoals = () => {
    return dispatch => {
                // dispatch(setItemsLoading);
                axios.get("/api/goal")
                .then(response => {
                    dispatch({
                        type: actionTypes.GET_GOALS,
                        payload: response.data
                    })
                }).catch(err => console.log(err));
            };
}