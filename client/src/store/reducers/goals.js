import * as actionType from "../actions/actionTypes";
// import { updateObject } from "../../shared/utility";
import uuid from "uuid/v4";

const initialState = {
    items : [
        {id: uuid(), content: "To get a job is software development", dateToComplete: "Sept 2020"},
        {id: uuid(), content: "Second Goal", dateToComplete: "April 2020"},
        {id: uuid(), content: "Third Goal", dateToComplete: "June 2020"}
      ]
}

const goalMoved = (state, action) => {
    const {source, destination} = action;
    const { items } = state;
    const copiedItems = [...items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    return {
      ...state,
      items: copiedItems
    }; 
  }


const reducer =(state = initialState, action) => {
    switch (action.type) {
        // case actionType.ADD_TASK: return addTask(state, action);
        case actionType.GOAL_MOVED: return goalMoved(state, action);
        default:
            return state;
    }
};

export default reducer;
