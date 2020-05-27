import * as actionTypes from "./actionTypes";
import axios from "axios";
import changeOrder from "../../shared/reorder";

export const addGoal = (goal, date, goals) => {
    return dispatch => {
        // dispatch(setItemsLoading);
        axios.post("/api/goal/add", {content: goal, date, order: goals.length})
        .then(response => {
            dispatch({
                type: actionTypes.ADD_GOAL,
                payload: response.data
            })
        }).catch(err => console.log(err));
    };
}

export const goalMoved = (source, destination, items) => {
    // const {source, destination} = action;
    // const { items } = state;
    const copiedItems = [...items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    const copiedItems2 = changeOrder([...copiedItems]);
    return dispatch => {
        dispatch({
        type: actionTypes.GOAL_MOVED,
        copiedItems: copiedItems2,
        source: source,
        destination: destination
        });
    // Compare old goals and new goals for updated items
    const updatedArray = [];
    for(let i = 0; i < copiedItems2.length;i++) {
        if (items[i] !== copiedItems2[i]) {
            // console.log(items[i]);
            console.log(copiedItems2[i]);
            updatedArray.push(copiedItems2[i]);
        }
    }
    console.log(updatedArray);
    
    if(updatedArray.length > 0) {

    // axios call to send new order to backend
    axios.post("/api/goal/updateMove", {newItems: updatedArray})
    .then(res => {
        console.log(res);
    }).catch(error => {
        console.log(error);
    });

    }


    // axios.post()
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
                    console.log(response.data);
                    dispatch({
                        type: actionTypes.GET_GOALS,
                        payload: response.data
                    })
                }).catch(err => console.log(err));
            };
}