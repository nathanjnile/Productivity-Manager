import * as actionType from "../actions/actionTypes";
// import { updateObject } from "../../shared/utility";

const initialState = {
    // items : [
    //     {id: uuid(), content: "To get a job is software development", dateToComplete: "Sept 2020"},
    //     {id: uuid(), content: "Second Goal", dateToComplete: "April 2020"},
    //     {id: uuid(), content: "Third Goal", dateToComplete: "June 2020"}
    //   ]
    items:[]
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

  const getGoals = (state, action) => {
    return {
      ...state,
      items: action.payload
    }; 
  }


const reducer =(state = initialState, action) => {
    switch (action.type) {
        case actionType.GOAL_MOVED: return goalMoved(state, action);
        case actionType.GET_GOALS: return getGoals(state, action);
        default:
            return state;
    }
};

export default reducer;
