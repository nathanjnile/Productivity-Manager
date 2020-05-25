import * as actionTypes from "./actionTypes";
import axios from "axios";

export const addGoal = (goal, date) => {
    return dispatch => {
        // dispatch(setItemsLoading);
        axios.post("/api/goal/add", {content: goal, date})
        .then(response => {
            dispatch({
                type: actionTypes.ADD_GOAL,
                payload: response.data
            })
        }).catch(err => console.log(err));
    };
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

export const deleteGoal = (cardId, cardIndex) => {
    return dispatch => {
        // dispatch(setItemsLoading);
        axios.delete(`/api/goal/${cardId}`)
        .then(response => {
            dispatch({
                type: actionTypes.DELETE_GOAL,
                payload: {cardId, cardIndex}
            })
        }).catch(err => console.log(err));
    }; 
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